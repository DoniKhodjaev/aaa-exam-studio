import { defineConfig } from "vite";
import { resolve } from "path";
import { createHash } from "crypto";
import { writeFileSync, readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/* Генерирует cons-sw.js: предзагрузка всех файлов Consolidation Studio для офлайн-работы. */
function consServiceWorker() {
  return {
    name: "cons-service-worker",
    apply: "build",
    enforce: "post",
    writeBundle(options, bundle) {
      const entry = Object.values(bundle).find(c => c.type === "chunk" && c.isEntry && c.name === "consolidation");
      if (!entry) return;
      const files = new Set(), seen = new Set();
      const walk = name => {
        if (seen.has(name) || !bundle[name]) return;
        seen.add(name); files.add(name);
        const c = bundle[name];
        if (c.type !== "chunk") return;
        (c.imports || []).forEach(walk);
        (c.dynamicImports || []).forEach(walk);
        const meta = c.viteMetadata || {};
        (meta.importedCss ? [...meta.importedCss] : []).forEach(f => files.add(f));
        (meta.importedAssets ? [...meta.importedAssets] : []).filter(f => !/KaTeX_.*\.(woff|ttf)$/.test(f)).forEach(f => files.add(f));
      };
      walk(entry.fileName);
      const htmlSrc = readFileSync(resolve(options.dir, "consolidation.html"), "utf8");
      (htmlSrc.match(/assets\/[A-Za-z0-9_.-]+\.(?:js|css)/g) || []).forEach(f => { walk(f); files.add(f); });
      Object.values(bundle).forEach(a => { if (a.type === "asset" && /KaTeX_.*\.woff2$/.test(a.fileName)) files.add(a.fileName); });
      const list = [...new Set(["consolidation.html", "cons/manifest.webmanifest", "cons/icon-192.png", "cons/icon-512.png", "cons/apple-touch-icon.png", ...[...files].sort()])];
      const version = createHash("sha1").update(list.join("|")).digest("hex").slice(0, 10);
      const sw = `/* Consolidation Studio service worker (сгенерирован при сборке) */
const CACHE = "cons-${version}";
const PRECACHE = ${JSON.stringify(list.map(f => "./" + f))};
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("cons-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./consolidation.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok && url.pathname.includes("/assets/")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
`;
      writeFileSync(resolve(options.dir, "cons-sw.js"), sw);
    }
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), consServiceWorker()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        afm: resolve(__dirname, "afm.html"),
        consolidation: resolve(__dirname, "consolidation.html")
      }
    }
  }
});
