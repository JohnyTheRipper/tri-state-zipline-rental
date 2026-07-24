const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { page, corePages, audiences, seoPages } = require("./src/render");

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = path.join(ROOT, "data");
const PROPOSALS_FILE = path.join(DATA_DIR, "proposals.json");
const PORT = Number(process.env.PORT || 5174);
const MAX_BODY_BYTES = 1024 * 1024;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = normalizePath(url.pathname);

    if (req.method === "POST" && pathname === "/api/proposals") {
      await handleProposal(req, res);
      return;
    }

    if (req.method === "GET" && pathname === "/api/health") {
      sendJson(res, 200, { ok: true, app: "tri-state-zipline-rental" });
      return;
    }

    if (req.method === "GET" && pathname === "/robots.txt") {
      sendText(res, 200, robots(url.origin), "text/plain; charset=utf-8");
      return;
    }

    if (req.method === "GET" && pathname === "/sitemap.xml") {
      sendText(res, 200, sitemap(url.origin), "application/xml; charset=utf-8");
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      if (await sendStatic(pathname, req, res)) return;
      const rendered = page(pathname);
      sendHtml(res, rendered.status, rendered.html, req.method === "HEAD");
      return;
    }

    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Tri-State Zipline Rental Node site: http://localhost:${PORT}`);
});

function normalizePath(value) {
  if (!value || value === "/") return "/";
  return value.replace(/\/+$/, "") || "/";
}

async function sendStatic(pathname, req, res) {
  const filePath = path.normalize(path.join(PUBLIC_DIR, decodeURIComponent(pathname)));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(res, 403, { error: "Forbidden" });
    return true;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return false;
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff"
    });
    if (req.method === "HEAD") {
      res.end();
      return true;
    }
    res.end(await fs.readFile(filePath));
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function handleProposal(req, res) {
  const body = await readBody(req);
  const params = new URLSearchParams(body);
  const honeypot = String(params.get("website") || "").trim();
  if (honeypot) {
    sendJson(res, 200, { ok: true, redirectedTo: "/proposal-confirmation" });
    return;
  }

  const required = ["organizationName", "email", "phone", "eventDate", "eventType", "attendance", "budgetRange"];
  const missing = required.filter((field) => !String(params.get(field) || "").trim());
  if (missing.length) {
    sendJson(res, 400, { error: "Missing required fields", fields: missing });
    return;
  }

  const proposal = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    organizationName: clean(params.get("organizationName")),
    contactName: clean(params.get("contactName")),
    email: clean(params.get("email")),
    phone: clean(params.get("phone")),
    eventDate: clean(params.get("eventDate")),
    eventType: clean(params.get("eventType")),
    attendance: clean(params.get("attendance")),
    budgetRange: clean(params.get("budgetRange")),
    eventLocation: clean(params.get("eventLocation")),
    city: clean(params.get("city")),
    state: clean(params.get("state")),
    availableLength: clean(params.get("availableLength")),
    availableWidth: clean(params.get("availableWidth")),
    surfaceType: clean(params.get("surfaceType")),
    indoorOutdoor: clean(params.get("indoorOutdoor")),
    truckAccess: clean(params.get("truckAccess")),
    overheadObstructions: clean(params.get("overheadObstructions")),
    desiredPackage: clean(params.get("desiredPackage")),
    brandingInterest: clean(params.get("brandingInterest")),
    eventGoals: clean(params.get("eventGoals")),
    additionalNotes: clean(params.get("additionalNotes")),
    consent: clean(params.get("consent")),
    landingPage: clean(params.get("landingPage")),
    utmSource: clean(params.get("utmSource")),
    utmMedium: clean(params.get("utmMedium")),
    utmCampaign: clean(params.get("utmCampaign")),
    leadStatus: "New proposal request",
    followUpDate: ""
  };

  await fs.mkdir(DATA_DIR, { recursive: true });
  const existing = await readProposals();
  existing.push(proposal);
  await fs.writeFile(PROPOSALS_FILE, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
  sendJson(res, 200, { ok: true, redirectedTo: "/proposal-confirmation", id: proposal.id });
}

async function readProposals() {
  try {
    return JSON.parse(await fs.readFile(PROPOSALS_FILE, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function clean(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 2000);
}

function sendHtml(res, status, html, headOnly = false) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  });
  res.end(headOnly ? "" : html);
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(`${JSON.stringify(data, null, 2)}\n`);
}

function sendText(res, status, text, contentType) {
  res.writeHead(status, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(text);
}

function allRoutes() {
  const core = Object.keys(corePages);
  const audience = Object.keys(audiences).map((slug) => `/${slug}`);
  const seo = Object.keys(seoPages).map((slug) => `/${slug}`);
  return ["/", ...core, ...audience, ...seo]
    .filter((route, index, list) => list.indexOf(route) === index)
    .sort();
}

function sitemap(origin) {
  const urls = allRoutes()
    .map((route) => `  <url><loc>${origin}${route === "/" ? "/" : route}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robots(origin) {
  return `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`;
}
