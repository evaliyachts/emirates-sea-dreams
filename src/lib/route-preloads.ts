export interface ManifestChunk { file: string; imports?: string[]; isEntry?: boolean }
export type AssetManifest = Record<string, ManifestChunk>;

const pageForRoute = (path: string, notFound: boolean) => {
  if (notFound) return "NotFound";
  if (path.startsWith("/yachts/")) return "YachtDetails";
  if (path.startsWith("/services/")) return "ServiceDetails";
  const pages: Record<string, string> = { "/": "Index", "/yachts": "Yachts", "/services": "Services", "/occasions": "Occasions", "/about": "About", "/faq": "FAQ", "/contact": "Contact", "/terms": "Terms", "/privacy": "Privacy" };
  const page = pages[path];
  if (!page) throw new Error(`No page chunk owner for ${path}`);
  return page;
};

export const routeModulePreloads = (manifest: AssetManifest, path: string, notFound = false): string => {
  const owner = `src/pages/${pageForRoute(path, notFound)}.tsx`;
  if (!manifest[owner]) throw new Error(`Missing built route chunk ${owner}`);
  const visited = new Set<string>();
  const files = new Set<string>();
  const visit = (key: string) => {
    if (visited.has(key)) return;
    visited.add(key);
    const chunk = manifest[key];
    if (!chunk) throw new Error(`Missing imported chunk ${key}`);
    if (!chunk.isEntry) {
      if (!/^assets\/[A-Za-z0-9_.-]+\.js$/.test(chunk.file)) throw new Error("Unsafe route chunk filename");
      files.add(chunk.file);
    }
    chunk.imports?.forEach(visit);
  };
  visit(owner);
  return [...files].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`).join("\n");
};
