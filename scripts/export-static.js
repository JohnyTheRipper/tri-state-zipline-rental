const fs = require("fs/promises");
const path = require("path");
const { page, corePages, audiences, seoPages } = require("../src/render");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(ROOT, "docs");
const BASE_PATH = normalizeBasePath(process.env.BASE_PATH || "/tri-state-zipline-rental");
const SITE_ORIGIN = process.env.SITE_ORIGIN || "https://johnytheripper.github.io";

async function main() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.cp(PUBLIC_DIR, OUT_DIR, { recursive: true });

  const routes = allRoutes();
  for (const route of routes) {
    const rendered = page(route);
    await writeRoute(route, rewriteHtml(rendered.html));
  }

  await fs.writeFile(path.join(OUT_DIR, "404.html"), rewriteHtml(page("/404").html), "utf8");
  await fs.writeFile(path.join(OUT_DIR, ".nojekyll"), "\n", "utf8");
  await fs.writeFile(path.join(OUT_DIR, "robots.txt"), robots(), "utf8");
  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), sitemap(routes), "utf8");
  await rewriteCss(path.join(OUT_DIR, "styles.css"));

  console.log(`Exported ${routes.length} routes to ${path.relative(ROOT, OUT_DIR)} for ${SITE_ORIGIN}${BASE_PATH}/`);
}

function allRoutes() {
  const core = Object.keys(corePages);
  const audience = Object.keys(audiences).map((slug) => `/${slug}`);
  const seo = Object.keys(seoPages).map((slug) => `/${slug}`);
  return ["/", ...core, ...audience, ...seo]
    .filter((route, index, list) => list.indexOf(route) === index)
    .sort((a, b) => a.localeCompare(b));
}

async function writeRoute(route, html) {
  const outputPath =
    route === "/" ? path.join(OUT_DIR, "index.html") : path.join(OUT_DIR, route.slice(1), "index.html");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

function rewriteHtml(html) {
  return html
    .replace(/(href|src|poster|action)="\/(?!\/)([^"]*)"/g, (_match, attr, target) => {
      return `${attr}="${assetPath(`/${target}`)}"`;
    })
    .replace(/content="\/(assets\/[^"]*)"/g, (_match, target) => {
      return `content="${SITE_ORIGIN}${assetPath(`/${target}`)}"`;
    });
}

async function rewriteCss(filePath) {
  const css = await fs.readFile(filePath, "utf8");
  await fs.writeFile(
    filePath,
    css.replace(/url\((['"]?)\/(?!\/)([^'")]+)\1\)/g, (_match, quote, target) => {
      const mark = quote || "\"";
      return `url(${mark}${assetPath(`/${target}`)}${mark})`;
    }),
    "utf8",
  );
}

function sitemap(routes) {
  const urls = routes
    .map((route) => {
      const loc = `${SITE_ORIGIN}${BASE_PATH}${route === "/" ? "/" : `${route}/`}`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robots() {
  return `User-agent: *\nAllow: ${BASE_PATH}/\nSitemap: ${SITE_ORIGIN}${BASE_PATH}/sitemap.xml\n`;
}

function assetPath(target) {
  if (BASE_PATH === "") return target;
  if (target === "/") return `${BASE_PATH}/`;
  return `${BASE_PATH}${target}`;
}

function normalizeBasePath(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
