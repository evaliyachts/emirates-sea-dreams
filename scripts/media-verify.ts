import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mediaRightsRegistry, NEUTRAL_YACHT_FALLBACK } from "../src/data/media-rights";
import { publishableYachts, type YachtMediaRecord } from "../src/data/yachts";

const supportedContentTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

export interface VerifiedImage {
  width: number;
  height: number;
  contentType: string;
  finalUrl?: string;
}

const pngDimensions = (bytes: Uint8Array) => {
  if (bytes.length < 24 || String.fromCharCode(...bytes.slice(1, 4)) !== "PNG") return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
};

const jpegDimensions = (bytes: Uint8Array) => {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return undefined;
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) { offset += 1; continue; }
    const marker = bytes[offset + 1];
    const length = (bytes[offset + 2] << 8) + bytes[offset + 3];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: (bytes[offset + 5] << 8) + bytes[offset + 6], width: (bytes[offset + 7] << 8) + bytes[offset + 8] };
    }
    if (length < 2) break;
    offset += length + 2;
  }
  return undefined;
};

const webpDimensions = (bytes: Uint8Array) => {
  const text = new TextDecoder("ascii").decode(bytes.slice(0, 16));
  if (!text.startsWith("RIFF") || !text.includes("WEBP") || bytes.length < 30) return undefined;
  const chunk = new TextDecoder("ascii").decode(bytes.slice(12, 16));
  if (chunk === "VP8X") {
    return {
      width: 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16),
      height: 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16),
    };
  }
  if (chunk === "VP8 " && bytes[23] === 0x9d && bytes[24] === 0x01 && bytes[25] === 0x2a) {
    return {
      width: (bytes[26] | (bytes[27] << 8)) & 0x3fff,
      height: (bytes[28] | (bytes[29] << 8)) & 0x3fff,
    };
  }
  if (chunk === "VP8L" && bytes[20] === 0x2f) {
    return {
      width: 1 + bytes[21] + ((bytes[22] & 0x3f) << 8),
      height: 1 + ((bytes[22] & 0xc0) >> 6) + (bytes[23] << 2) + ((bytes[24] & 0x0f) << 10),
    };
  }
  return undefined;
};

const svgDimensions = (bytes: Uint8Array) => {
  const source = new TextDecoder().decode(bytes);
  if (!/<svg\b/i.test(source)) return undefined;
  const width = Number(source.match(/\bwidth=["']([0-9.]+)["']/i)?.[1]);
  const height = Number(source.match(/\bheight=["']([0-9.]+)["']/i)?.[1]);
  return width > 0 && height > 0 ? { width, height } : undefined;
};

export const decodeImageDimensions = (bytes: Uint8Array, contentType: string) => {
  if (contentType === "image/png") return pngDimensions(bytes);
  if (contentType === "image/jpeg") return jpegDimensions(bytes);
  if (contentType === "image/webp") return webpDimensions(bytes);
  if (contentType === "image/svg+xml") return svgDimensions(bytes);
  return undefined;
};

const contentTypeForLocalPath = (path: string) => {
  const extension = extname(path).toLowerCase();
  return extension === ".svg" ? "image/svg+xml" : extension === ".png" ? "image/png" :
    [".jpg", ".jpeg"].includes(extension) ? "image/jpeg" : extension === ".webp" ? "image/webp" : "";
};

export const verifyLocalImage = async (path: string): Promise<VerifiedImage> => {
  const contentType = contentTypeForLocalPath(path);
  if (!supportedContentTypes.has(contentType)) throw new Error(`${path}: unsupported local image format.`);
  const bytes = new Uint8Array(await readFile(resolve("public", path.replace(/^\//, ""))));
  if (bytes.byteLength === 0) throw new Error(`${path}: image is empty.`);
  const dimensions = decodeImageDimensions(bytes, contentType);
  if (!dimensions) throw new Error(`${path}: image dimensions could not be decoded.`);
  return { ...dimensions, contentType };
};

export const verifyRemoteImage = async (
  url: string,
  fetcher: typeof fetch = fetch,
): Promise<VerifiedImage> => {
  const requested = new URL(url);
  if (requested.protocol !== "https:") throw new Error(`${url}: remote yacht media must use HTTPS.`);
  let response: Response | undefined;
  let transportError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      response = await fetcher(url, { redirect: "follow", signal: controller.signal });
      break;
    } catch (error) {
      transportError = error;
      if (attempt === 3) throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
  if (!response) throw transportError;
  if (!response.ok) throw new Error(`${url}: returned HTTP ${response.status}.`);
  const finalUrl = new URL(response.url || url);
  if (finalUrl.protocol !== "https:" || finalUrl.hostname !== requested.hostname) {
    throw new Error(`${url}: redirected to an unapproved final host ${finalUrl.hostname}.`);
  }
  const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "";
  if (!supportedContentTypes.has(contentType)) throw new Error(`${url}: unsupported content type ${contentType || "missing"}.`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength === 0) throw new Error(`${url}: response body is empty.`);
  const dimensions = decodeImageDimensions(bytes, contentType);
  if (!dimensions) throw new Error(`${url}: response is not a supported decodable image.`);
  return { ...dimensions, contentType, finalUrl: finalUrl.href };
};

export const verifyYachtMediaRecord = async (media: YachtMediaRecord) => {
  const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
  if (!rights || rights.status !== "approved" || !rights.approvedHosts.includes("yachtrentaldxb.com")) {
    throw new Error(`${media.path}: missing approved English-domain rights record.`);
  }
  if (rights.productionPath !== media.path) throw new Error(`${media.path}: rights record path does not match production media.`);
  const result = /^https:\/\//.test(media.path) ? await verifyRemoteImage(media.path) : await verifyLocalImage(media.path);
  if (result.width !== media.width || result.height !== media.height) {
    throw new Error(`${media.path}: declared ${media.width}x${media.height}, decoded ${result.width}x${result.height}.`);
  }
  return result;
};

export const verifyProductionYachtMedia = async () => {
  const media = publishableYachts.flatMap((yacht) => yacht.media);
  const uniquePaths = new Set(media.map((record) => record.path));
  if (uniquePaths.size !== media.length) throw new Error("Production yacht media paths must be unique.");
  await verifyLocalImage(NEUTRAL_YACHT_FALLBACK);
  const queue = [...media];
  await Promise.all(Array.from({ length: Math.min(6, queue.length) }, async () => {
    for (;;) {
      const record = queue.shift();
      if (!record) return;
      await verifyYachtMediaRecord(record);
    }
  }));
  return { yachtCount: publishableYachts.length, imageCount: media.length };
};

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const result = await verifyProductionYachtMedia();
  console.log(`Media verification passed: ${result.imageCount} production yacht images across ${result.yachtCount} publishable yachts; neutral fallback decoded successfully.`);
}
