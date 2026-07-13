import { PREVIEW_URL, PRODUCTION_URL } from "../src/config/site-facts";

export const ENGLISH_PRODUCTION_ORIGIN = new URL(PRODUCTION_URL).origin;
export const ENGLISH_PREVIEW_ORIGIN = new URL(PREVIEW_URL).origin;

export const canonicalUrlForPath = (path: string): string => {
  if (path === "/") return `${ENGLISH_PRODUCTION_ORIGIN}/`;
  return `${ENGLISH_PRODUCTION_ORIGIN}${path}`;
};
