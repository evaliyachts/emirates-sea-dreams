import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HOMEPAGE_MEDIA, type HomepageMediaRecord } from "../src/data/home-media";
import { approvedServices, type ApprovedServiceMedia } from "../src/data/approved-services";
import { mediaRightsRegistry, NEUTRAL_YACHT_FALLBACK } from "../src/data/media-rights";
import { publishableYachts, type YachtMediaRecord } from "../src/data/yachts";

const supportedContentTypes = new Set(["image/avif", "image/jpeg", "image/png", "image/webp", "image/svg+xml"]);

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

const avifDimensions = (bytes: Uint8Array) => {
  const signature = new TextDecoder("ascii").decode(bytes.slice(4, 12));
  if (!signature.startsWith("ftyp") || !/avi[fs]/.test(signature)) return undefined;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let offset = 4; offset + 16 <= bytes.length; offset += 1) {
    if (
      bytes[offset] === 0x69 &&
      bytes[offset + 1] === 0x73 &&
      bytes[offset + 2] === 0x70 &&
      bytes[offset + 3] === 0x65
    ) {
      const width = view.getUint32(offset + 8);
      const height = view.getUint32(offset + 12);
      if (width > 0 && height > 0) return { width, height };
    }
  }
  return undefined;
};

export const decodeImageDimensions = (bytes: Uint8Array, contentType: string) => {
  if (contentType === "image/avif") return avifDimensions(bytes);
  if (contentType === "image/png") return pngDimensions(bytes);
  if (contentType === "image/jpeg") return jpegDimensions(bytes);
  if (contentType === "image/webp") return webpDimensions(bytes);
  if (contentType === "image/svg+xml") return svgDimensions(bytes);
  return undefined;
};

const contentTypeForLocalPath = (path: string) => {
  const extension = extname(path).toLowerCase();
  return extension === ".avif" ? "image/avif" : extension === ".svg" ? "image/svg+xml" : extension === ".png" ? "image/png" :
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

export const verifyHomepageMediaRecord = async (media: HomepageMediaRecord) => {
  const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
  if (!rights || rights.status !== "approved" || !rights.approvedHosts.includes("yachtrentaldxb.com")) {
    throw new Error(`${media.path}: missing approved English-domain homepage rights record.`);
  }
  if (rights.productionPath !== media.path) throw new Error(`${media.path}: homepage rights record path does not match production media.`);
  if (/^https?:\/\//.test(media.path)) throw new Error(`${media.path}: homepage snapshots must use a neutral local production path.`);
  const result = await verifyLocalImage(media.path);
  if (result.width !== media.width || result.height !== media.height) {
    throw new Error(`${media.path}: declared ${media.width}x${media.height}, decoded ${result.width}x${result.height}.`);
  }
  return result;
};

export const verifyServiceMediaRecord = async (media: ApprovedServiceMedia, servicePath: string) => {
  const rights = mediaRightsRegistry.find((record) => record.id === media.rightsRecordId);
  if (
    !rights ||
    rights.status !== "approved" ||
    rights.productionPath !== media.path ||
    !rights.approvedHosts.includes("yachtrentaldxb.com") ||
    !rights.approvedSurfaces.includes(`Service detail primary image: ${servicePath}`) ||
    rights.socialPreviewApproved
  ) {
    throw new Error(`${servicePath}: service image lacks its exact approved visible-only rights scope.`);
  }
  if (/^https?:\/\//.test(media.path)) throw new Error(`${servicePath}: remote service media is prohibited.`);
  const result = await verifyLocalImage(media.path);
  if (result.width !== media.width || result.height !== media.height) {
    throw new Error(`${media.path}: declared ${media.width}x${media.height}, decoded ${result.width}x${result.height}.`);
  }
  return result;
};

export const verifyProductionHomepageMedia = async () => {
  const paths = HOMEPAGE_MEDIA.map((record) => record.path);
  const rightsIds = HOMEPAGE_MEDIA.map((record) => record.rightsRecordId);
  if (new Set(paths).size !== paths.length) throw new Error("Production homepage media paths must be unique.");
  if (new Set(rightsIds).size !== rightsIds.length) throw new Error("Production homepage media rights IDs must be unique.");
  await Promise.all(HOMEPAGE_MEDIA.map(verifyHomepageMediaRecord));
  return { imageCount: HOMEPAGE_MEDIA.length };
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

export const verifyProductionServiceMedia = async () => {
  const records = approvedServices.flatMap((service) => service.media ? [{ service, media: service.media }] : []);
  if (records.length !== 7) throw new Error(`Expected seven approved service-detail images; found ${records.length}.`);
  await Promise.all(records.map(({ service, media }) => verifyServiceMediaRecord(media, service.path)));
  return { serviceCount: approvedServices.length, imageCount: records.length, textOnlyCount: approvedServices.length - records.length };
};

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const [yachts, homepage, services] = await Promise.all([
    verifyProductionYachtMedia(),
    verifyProductionHomepageMedia(),
    verifyProductionServiceMedia(),
  ]);
  console.log(`Media verification passed: ${yachts.imageCount} production yacht images across ${yachts.yachtCount} publishable yachts; ${homepage.imageCount} approved local homepage images; ${services.imageCount} matching service-detail images across ${services.serviceCount} approved services (${services.textOnlyCount} text-only); neutral fallback decoded successfully.`);
}
