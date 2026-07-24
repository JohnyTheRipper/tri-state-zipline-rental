const {
  business,
  nav,
  trustStrip,
  packages,
  audiences,
  seoPages,
  faqs,
  galleryCategories,
  videoCategories,
  blogIdeas,
  corePages
} = require("./data");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function page(pathname) {
  if (pathname === "/") return homePage();
  if (pathname === "/mobile-zipline") return mobileZiplinePage();
  if (pathname === "/packages") return packagesPage();
  if (pathname === "/package-comparison") return packageComparisonPage();
  if (pathname === "/who-we-serve") return whoWeServePage();
  if (pathname in audiencePathMap()) return audiencePage(pathname.slice(1));
  if (pathname === "/safety") return safetyPage();
  if (pathname === "/event-planning") return planningPage();
  if (pathname === "/gallery") return galleryPage();
  if (pathname === "/videos") return videosPage();
  if (pathname === "/case-studies") return caseStudiesPage();
  if (pathname === "/frequently-asked-questions") return faqPage();
  if (pathname === "/request-a-proposal") return proposalPage();
  if (pathname === "/contact") return contactPage();
  if (pathname === "/proposal-confirmation") return confirmationPage();
  if (pathname === "/about") return standardPage("About", "Operated by Extreme Party Racing & Entertainment, Tri-State Zipline Rental focuses on professionally staffed, high-impact mobile zipline experiences for major events.");
  if (pathname === "/experiences") return standardPage("Experiences", "Explore mobile zipline experiences, adventure zones, additional attractions and brand activations built for professional event audiences.", experiencesSection());
  if (pathname === "/resources") return resourcesPage();
  if (pathname === "/blog") return blogPage();
  if (["/privacy-policy", "/terms-and-conditions", "/accessibility-statement"].includes(pathname)) {
    const title = corePages[pathname];
    return policyPage(title);
  }
  if (pathname.slice(1) in seoPages) return seoLandingPage(pathname.slice(1));
  return notFoundPage();
}

function layout({ title, description, path = "/", content, schema = [], status = 200 }) {
  const canonical = `https://tristateziplinerental.com${path === "/" ? "/" : path}`;
  const pageTitle = `${title} | ${business.name}`;
  const schemaScripts = schema
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("");

  return {
    status,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${escapeHtml(pageTitle)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="/assets/premier_zipline.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#061B31">
    <link rel="preload" href="/assets/premier_zipline.jpg" as="image" fetchpriority="high">
    <link rel="stylesheet" href="/styles.css">
    ${schemaScripts}
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${announcement()}
    ${header(path)}
    <main id="main">${content}</main>
    ${footer()}
    <script src="/app.js" defer></script>
  </body>
</html>`
  };
}

function announcement() {
  return `<div class="announcement"><strong>Planning a major event?</strong> Experiences typically begin at $5,500, with large-scale activations ranging from $15,000 to $40,000+.</div>`;
}

function header(path) {
  const navItems = nav
    .map((item) => {
      const active = path === item.href || (item.href !== "/" && path.startsWith(`${item.href}/`));
      const children = item.items
        ? `<button class="nav-drop-toggle" type="button" aria-expanded="false" aria-label="Open ${escapeHtml(item.label)} menu"></button>
          <ul class="nav-submenu">${item.items
            .map(([label, href]) => `<li><a href="${href}">${escapeHtml(label)}</a></li>`)
            .join("")}</ul>`
        : "";
      return `<li class="${item.items ? "has-submenu" : ""}"><a ${active ? 'aria-current="page"' : ""} href="${item.href}">${escapeHtml(item.label)}</a>${children}</li>`;
    })
    .join("");
  return `<header class="site-header" data-header>
    <div class="header-inner">
      <a class="logo" href="/" aria-label="${business.name} home">
        <span>Tri-State</span><strong>Zipline Rental</strong><small>A division of ${escapeHtml(business.operatedBy)}</small>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle><span></span><span></span><span></span><em>Menu</em></button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation" data-nav><ul>${navItems}</ul></nav>
      <div class="header-actions">
        <a class="phone-link" href="tel:${business.phoneHref}" data-track="phone">${business.phoneDisplay}<span>${business.phoneSecondary}</span></a>
        <a class="button button-primary" href="/request-a-proposal">Request Proposal</a>
      </div>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <section class="final-cta section">
      <div class="container final-cta-inner">
        <div>
          <p class="kicker">Ready to take your event to new heights?</p>
          <h2>Build the centerpiece your audience will talk about.</h2>
          <p>Tell us about the venue, audience, budget range and logistics. Our team will review fit, space, access and package options.</p>
        </div>
        <a class="button button-primary" href="/request-a-proposal">Request Your Custom Proposal</a>
      </div>
    </section>
    <div class="footer-main">
      <div class="container footer-grid">
        <div><a class="logo logo-footer" href="/"><span>Tri-State</span><strong>Zipline Rental</strong><small>A division of ${escapeHtml(business.operatedBy)}</small></a><p>${escapeHtml(business.secondaryTagline)}</p></div>
        <div><h2>Quick Links</h2><a href="/packages">Packages</a><a href="/who-we-serve">Who We Serve</a><a href="/safety">Safety</a><a href="/gallery">Gallery</a><a href="/contact">Contact</a></div>
        <div><h2>Popular Pages</h2><a href="/zipline-rental-nj">Zipline Rental NJ</a><a href="/zipline-rental-ny">Zipline Rental NY</a><a href="/zipline-rental-pa">Zipline Rental PA</a><a href="/college-zipline-rental">College Zipline Rental</a><a href="/corporate-zipline-rental">Corporate Zipline Rental</a></div>
        <div><h2>Contact</h2><a data-track="phone" href="tel:${business.phoneHref}">${business.phoneDisplay} ${business.phoneSecondary}</a><a data-track="email" href="mailto:${business.email}">${business.email}</a><p>Serving ${escapeHtml(business.region)}</p><p class="owner-note">TODO: Verify insurance and inspection wording before launch.</p></div>
      </div>
    </div>
    <div class="footer-legal"><div class="container"><p>&copy; ${new Date().getFullYear()} ${business.name}. Operated by ${escapeHtml(business.operatedBy)}.</p><p><a href="/privacy-policy">Privacy</a><a href="/terms-and-conditions">Terms</a><a href="/accessibility-statement">Accessibility</a></p></div></div>
  </footer>`;
}

function homePage() {
  return layout({
    title: business.tagline,
    description: business.secondaryTagline,
    path: "/",
    schema: [organizationSchema(), faqSchema(6)],
    content: `${heroHome()}${trustStripSection()}${audienceGrid()}${mobileFeature()}${eventExamples()}${packagesOverview()}${comparisonCta()}${safetyOperations()}${statsSection()}${logoStrip()}${videoFeature()}${galleryPreview()}${caseStudyPreview()}${testimonials()}${planningProcess()}${faqSection(6)}`
  });
}

function heroHome() {
  return `<section class="hero hero-home video-hero">
    <video class="hero-video" muted autoplay loop playsinline preload="metadata" poster="${business.referenceImage}" data-hero-video>
      <source src="/media/homepage-hype-desktop.mp4" type="video/mp4" media="(min-width: 768px)">
      <source src="/media/homepage-hype-mobile.mp4" type="video/mp4">
    </video>
    <div class="hero-overlay"></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="kicker">America's premier</p>
        <h1>${escapeHtml(business.tagline)}</h1>
        <p>${escapeHtml(business.secondaryTagline)}</p>
        <div class="actions"><a class="button button-primary" href="/request-a-proposal">Request Proposal</a><a class="button button-outline" href="/videos" data-track="video">Watch Video</a><a class="button button-ghost" href="/packages">View Packages</a></div>
        <button class="video-pause" type="button" data-video-toggle aria-pressed="false">Pause video</button>
      </div>
      <aside class="hero-form" aria-label="Proposal qualification form">
        <h2>Get a Custom Quote</h2>
        <p>Qualified experiences begin at $5,500+.</p>
        ${proposalForm({ compact: true })}
      </aside>
    </div>
  </section>`;
}

function trustStripSection() {
  return `<section class="trust-strip" aria-label="Trust and credentials"><div class="container trust-grid">${trustStrip
    .map(([title, copy]) => `<article><span aria-hidden="true"></span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></article>`)
    .join("")}</div></section>`;
}

function audienceGrid(title = "Who We Serve", copy = "Built for professional buyers who care about safety, logistics, documentation, attendance and event impact.") {
  return `<section class="section audience-grid"><div class="container"><div class="section-head"><p class="kicker">Professional buyer pathways</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></div><div class="audience-cards">${Object.entries(audiences)
    .map(([slug, audience]) => `<a class="audience-card" href="/${slug}"><span aria-hidden="true"></span><strong>${escapeHtml(audience.title)}</strong></a>`)
    .join("")}</div></div></section>`;
}

function mobileFeature() {
  return `<section class="section section-navy mobile-feature"><div class="container two-col"><div><p class="kicker">Flagship experience</p><h2>Not a rental drop-off. A fully staffed mobile attraction built as an event centerpiece.</h2><p>Tri-State Zipline Rental helps professional planners create a visible, high-energy draw that can anchor attendance, press, sponsorship and guest participation.</p>${checkList([
    "Fully staffed mobile zipline",
    "Two riders at one time",
    "Up to approximately 300-foot ride length depending on site conditions",
    "Approximately 30-foot tower height",
    "Professional operators included",
    "Industry-leading deceleration system",
    "State inspected, commercial-grade equipment"
  ])}<p class="disclaimer">Final ride length, layout, and operating configuration depend on site conditions, access, clearances, surface conditions, local requirements, and the approved event plan.</p><a class="button button-primary" href="/mobile-zipline">Explore Mobile Zipline</a></div>${mediaFrame()}</div></section>`;
}

function eventExamples() {
  const groups = [
    ["College Events", ["Welcome Week", "Orientation", "Homecoming", "Spring Fling"]],
    ["Municipal Events", ["Town Days", "National Night Out", "Community Festivals", "Concert Series"]],
    ["Corporate Events", ["Employee Appreciation", "Family Days", "Team Building", "Product Launches"]],
    ["Festivals & Tourism", ["County Fairs", "Food Festivals", "Destination Activations", "Sponsored Attractions"]]
  ];
  return `<section class="section"><div class="container"><div class="section-head"><p class="kicker">Event use cases</p><h2>High-impact moments for professional event calendars.</h2></div><div class="card-grid four">${groups
    .map(([title, items]) => `<article class="card"><h3>${escapeHtml(title)}</h3>${list(items)}</article>`)
    .join("")}</div></div></section>`;
}

function packagesOverview(full = false) {
  return `<section class="section section-navy package-section"><div class="container"><div class="section-head"><p class="kicker">Signature experiences</p><h2>Premium packages designed to maximize attendance and simplify planning.</h2><p class="disclaimer">Pricing varies by location, duration, travel, staffing, venue access, equipment selection, site conditions, permitting, and production requirements.</p></div><article class="package-card package-featured">${packageCard(packages[0], true)}</article><div class="card-grid two">${packages
    .slice(1, 3)
    .map((pkg) => `<article class="package-card">${packageCard(pkg)}</article>`)
    .join("")}</div><div class="enterprise-band"><p class="kicker">Premium and enterprise options</p><div class="card-grid three">${packages
    .slice(3)
    .map((pkg) => `<article class="package-card package-premium">${packageCard(pkg)}</article>`)
    .join("")}</div></div>${full ? `<div class="panel panel-light"><h3>Easy-to-edit package data</h3><p>Packages live in <code>src/data.js</code> and can later be moved into a CMS or database without changing the presentation layer.</p></div>` : ""}</div></section>`;
}

function packageCard(pkg, featured = false) {
  return `<div><p class="package-eyebrow">${featured ? "Flagship package" : "Premium package"}</p><h3>${escapeHtml(pkg.name)}</h3><p class="price">Starting at ${escapeHtml(pkg.price)}</p><p>${escapeHtml(pkg.short)}</p><p><strong>Best for:</strong> ${escapeHtml(pkg.bestFor)}</p>${list(pkg.features)}<a class="button button-outline" href="/request-a-proposal?package=${encodeURIComponent(pkg.name)}">Request Proposal</a></div>`;
}

function comparisonCta() {
  return `<section class="section section-tight"><div class="container centered-cta"><h2>Compare packages by staffing, coordination, branding and production support.</h2><a class="button button-primary" href="/package-comparison">Compare Packages</a></div></section>`;
}

function safetyOperations() {
  return `<section class="section safety-panel"><div class="container two-col"><div><p class="kicker">Safety and operations</p><h2>Built for buyers who need confidence before they sign.</h2><p>Municipalities, universities, corporate legal teams and event producers need documentation, site planning and trained operating support.</p></div>${checkList([
    "Safety-first operating philosophy",
    "State inspected commercial-grade equipment",
    "Professional operators included",
    "Setup, operation, supervision and breakdown",
    "Site review process and organizer coordination",
    "Insurance documentation support where available"
  ])}</div></section>`;
}

function statsSection() {
  const stats = [
    ["TODO", "Annual riders after owner verification"],
    ["$5.5K+", "Starting investment for qualified events"],
    ["$40K+", "Large-scale custom activation range"],
    ["NJ / NY / PA", "Core Northeast service region"]
  ];
  return `<section class="section stats"><div class="container card-grid four">${stats.map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join("")}</div></section>`;
}

function logoStrip() {
  return `<section class="section logo-strip"><div class="container"><p class="kicker">Client logos pending owner approval</p><div>${Array.from({ length: 6 }, (_, i) => `<span>Logo ${i + 1}</span>`).join("")}</div></div></section>`;
}

function videoFeature(title = "Featured Event Video", copy = "Replace this placeholder with a 30-second homepage hype reel after final video assets are approved.") {
  return `<section class="section video-section"><div class="container two-col"><div class="video-placeholder" data-track="video"><span>Video Placeholder</span></div><div><p class="kicker">Video library ready</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p><p class="disclaimer">Do not autoplay sound. Add captions and transcripts for important videos.</p><a class="button button-outline" href="/videos">View Video Library</a></div></div></section>`;
}

function galleryPreview() {
  return `<section class="section gallery"><div class="container"><div class="section-head"><p class="kicker">Gallery system</p><h2>Built to support 50+ professional event assets.</h2></div><div class="gallery-grid">${galleryCategories
    .slice(0, 6)
    .map((label) => `<figure><img src="${business.referenceImage}" alt="${escapeHtml(label)} placeholder image for ${escapeHtml(business.name)}" loading="lazy"><figcaption>${escapeHtml(label)}</figcaption></figure>`)
    .join("")}</div><a class="button button-primary" href="/gallery">View Full Gallery</a></div></section>`;
}

function caseStudyPreview() {
  return `<section class="section"><div class="container panel"><p class="kicker">Case study placeholder</p><h2>How a professional attraction can become the center of a public event.</h2><p>Use the case-study structure to document verified client goals, planning approach, site challenges, event-day execution, results, media and testimonial assets.</p><a class="button button-outline" href="/case-studies">View Case Studies</a></div></section>`;
}

function testimonials() {
  return `<section class="section testimonials"><div class="container"><div class="section-head"><p class="kicker">Owner verification required</p><h2>What event organizers say</h2></div><blockquote>"The zipline was the highlight of our festival. The team handled everything professionally, the crowds loved it, and we would absolutely book again."<cite>Recreation Director, Borough of Highland Park, New Jersey <span>Sample content - replace before launch.</span></cite></blockquote></div></section>`;
}

function planningProcess() {
  const steps = [
    "Submit Event Information",
    "Initial Logistics and Budget Review",
    "Recommended Experience and Proposal",
    "Site and Access Confirmation",
    "Documentation and Contracting",
    "Final Event Plan",
    "Delivery, Setup and Inspection",
    "Staffed Operation",
    "Breakdown and Removal"
  ];
  return `<section class="section process"><div class="container"><div class="section-head"><p class="kicker">Event planning process</p><h2>From first inquiry to final breakdown.</h2></div><ol>${steps.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol></div></section>`;
}

function faqSection(limit = 20) {
  return `<section class="section faq"><div class="container"><div class="section-head"><p class="kicker">Planning questions</p><h2>Frequently asked questions</h2></div><div class="faq-list">${faqs
    .slice(0, limit)
    .map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`)
    .join("")}</div></div></section>`;
}

function mobileZiplinePage() {
  return layout({
    title: "Mobile Zipline",
    description: "Flagship mobile zipline experience with professional operators, two-rider capability, site planning and commercial event support.",
    path: "/mobile-zipline",
    schema: [organizationSchema()],
    content: `${heroCompact("Flagship Mobile Zipline Experience", "A fully staffed, two-rider mobile zipline built for high-attendance professional events and carefully planned event production.", "Mobile Zipline")}${mobileFeature()}${mobileTechCards()}${galleryPreview()}${videoFeature("Mobile Zipline Video", "Add rider closeups, POV ride footage, crowd reactions, setup operations and venue context when production media is approved.")}${safetyOperations()}${faqSection(8)}`
  });
}

function mobileTechCards() {
  const cards = {
    "What is included": ["Mobile zipline", "Professional operators", "Safety equipment", "Standard setup and breakdown", "Planning support"],
    "Ride profile": ["Two riders at one time", "Up to approximately 300 feet depending on site conditions", "Approximately 30-foot tower height", "Industry-leading deceleration system"],
    "Site requirements": ["Minimum approximately 200 feet in length", "Approximately 30 feet of overhead clearance", "Open setup area", "Truck and trailer access", "No overhead obstructions"]
  };
  return `<section class="section"><div class="container card-grid three">${Object.entries(cards)
    .map(([title, items]) => `<article class="card"><h2>${escapeHtml(title)}</h2>${list(items)}</article>`)
    .join("")}</div><div class="container"><p class="disclaimer">These are preliminary planning guidelines. Final dimensions, clearance requirements, anchoring, access, operating layout, and site suitability must be confirmed before booking.</p></div></section>`;
}

function packagesPage() {
  return layout({
    title: "Packages",
    description: "Premium mobile zipline packages from $5,500+ to $40,000+ custom activations for colleges, corporations, municipalities and major events.",
    path: "/packages",
    schema: [organizationSchema()],
    content: `${heroCompact("Premium Event Packages", "Experiences typically begin at $5,500, with larger production activations ranging from $15,000 to $40,000+.", "Package strategy")}${packagesOverview(true)}${comparisonCta()}${pricingDisclaimer()}`
  });
}

function packageComparisonPage() {
  const rows = [
    ["Starting investment", packages.map((pkg) => pkg.price)],
    ["Attraction count", ["1 major attraction", "Zipline + add-ons", "Multiple premium attractions", "Premium public package", "Multiple premium attractions", "Multiple major attractions"]],
    ["Staffing", packages.map((pkg) => pkg.staffing)],
    ["Event coordination", ["Standard planning", "Operations support", "Campus coordination", "Public-event coordination", "Corporate coordination", "Advanced logistics"]],
    ["Branding", packages.map((pkg) => pkg.branding)],
    ["Best event type", packages.map((pkg) => pkg.bestFor)],
    ["Multi-day availability", ["Review required", "Review required", "Review required", "Available by scope", "Available by scope", "Custom scope"]],
    ["Dedicated event manager", ["Optional", "Optional", "By scope", "By scope", "Included", "Included"]],
    ["Customization level", ["Standard", "Expanded", "Campus-focused", "Public-event focused", "Corporate-focused", "Custom production"]]
  ];
  const table = `<section class="section"><div class="container"><div class="comparison" role="region" aria-label="Package comparison" tabindex="0"><table><thead><tr><th>Feature</th>${packages.map((pkg) => `<th>${escapeHtml(pkg.name)}</th>`).join("")}</tr></thead><tbody>${rows
    .map(([label, values]) => `<tr><th>${escapeHtml(label)}</th>${values.map((value) => `<td>${escapeHtml(value)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>${pricingDisclaimer()}</div></section>`;
  return layout({
    title: "Package Comparison",
    description: "Compare Tri-State Zipline Rental packages by investment, staffing, branding, event coordination, production support and customization.",
    path: "/package-comparison",
    content: `${heroCompact("Package Comparison", "Compare investment level, attractions, staffing, planning support, operating duration, branding and customization.", "Planning tool")}${table}`
  });
}

function whoWeServePage() {
  return layout({
    title: "Who We Serve",
    description: "Mobile zipline experiences for universities, corporations, municipalities, festivals, tourism organizations, camps and brand activations.",
    path: "/who-we-serve",
    content: `${heroCompact("Built for Professional Event Buyers", "Audience-specific experiences for universities, corporations, municipalities, tourism groups, fairs, camps and agencies.", "Who we serve")}${audienceGrid("Choose Your Event Category", "Each pathway speaks to planning concerns, logistics and value drivers of that buyer.")}${safetyOperations()}${packagesOverview()}`
  });
}

function audiencePathMap() {
  return Object.fromEntries(Object.keys(audiences).map((slug) => [`/${slug}`, slug]));
}

function audiencePage(slug) {
  const audience = audiences[slug];
  return layout({
    title: audience.title,
    description: `${audience.headline} Professional planning support, safety review, logistics and proposal qualification for ${audience.title.toLowerCase()}.`,
    path: `/${slug}`,
    content: `${heroCompact(`${audience.title} Zipline Experiences`, audience.headline, audience.title)}<section class="section"><div class="container two-col"><div><p class="kicker">Buyer concerns</p><h2>Built for planning simplicity and event impact.</h2><p>Professional buyers need more than attraction availability. They need a credible vendor who understands safety, access, logistics, staff, documentation, audience flow and contract value.</p>${checkList(audience.concerns)}</div><article class="panel"><h2>Suitable event types</h2>${list(audience.examples)}</article></div></section>${recommendedPackages(audience.recommended)}${safetyOperations()}${galleryPreview()}${testimonials()}`
  });
}

function recommendedPackages(names) {
  const selected = packages.filter((pkg) => names.includes(pkg.name));
  return `<section class="section section-navy"><div class="container"><div class="section-head"><p class="kicker">Recommended packages</p><h2>Good starting points for this audience.</h2></div><div class="card-grid three">${selected.map((pkg) => `<article class="package-card">${packageCard(pkg)}</article>`).join("")}</div></div></section>`;
}

function safetyPage() {
  const sections = {
    "Operating Philosophy": ["Safety-first event planning", "Professional operators included", "Ride briefing and crowd-control considerations", "Organizer responsibilities clearly reviewed"],
    "Equipment and Inspection": ["State inspected", "Commercial-grade equipment", "Industry-leading deceleration system", "Maintenance philosophy and owner-approved details pending"],
    "Planning and Documentation": ["Site review process", "Setup and breakdown procedures", "Weather monitoring planning", "Emergency action planning", "Insurance documentation support"]
  };
  return layout({
    title: "Safety",
    description: "Safety, documentation and operations information for municipalities, universities, corporate legal teams and professional event producers.",
    path: "/safety",
    content: `${heroCompact("Safety, Documentation and Event Operations", "Confidence-building information for municipalities, universities, corporate legal departments and professional event producers.", "Safety")}<section class="section"><div class="container card-grid three">${Object.entries(sections)
      .map(([title, items]) => `<article class="card"><h2>${escapeHtml(title)}</h2>${list(items)}</article>`)
      .join("")}</div><div class="container"><p class="disclaimer">Do not publish manufacturer, exact insurance carrier, certification body, inspection agency, engineering standard, weight limits, age limits, rider throughput, wind limits or anchoring specifications until verified by the owner.</p></div></section>${faqSection(10)}`
  });
}

function planningPage() {
  const cards = {
    "Venue access": "Available space, surface type, overhead clearance, truck access, setup access and utilities.",
    Operations: "Crowd flow, security, permits, insurance, weather planning, emergency planning and staffing.",
    "Production goals": "Event goals, branding, sponsor requirements, operating schedule, setup timing and breakdown timing."
  };
  return layout({
    title: "Event Planning",
    description: "Professional event planning guidance for mobile zipline proposals, site access, space requirements, operations and documentation.",
    path: "/event-planning",
    content: `${heroCompact("Event Planning Guide", "The information professional planners should gather before requesting a mobile zipline proposal.", "Planning")}${planningProcess()}<section class="section"><div class="container card-grid three">${Object.entries(cards)
      .map(([title, copy]) => `<article class="card"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></article>`)
      .join("")}</div></section>`
  });
}

function galleryPage() {
  return layout({
    title: "Gallery",
    description: "Gallery structure for mobile zipline, college, municipal, corporate, festival, tourism, camp and brand activation photos.",
    path: "/gallery",
    content: `${heroCompact("Event Gallery", "A production-ready structure for mobile zipline, college, municipal, corporate, festival, tourism, camp and brand activation photography.", "Gallery")}<section class="section section-tight"><div class="container filter-bar">${["All", ...galleryCategories]
      .map((filter) => `<button type="button" data-filter="${slugify(filter)}">${escapeHtml(filter)}</button>`)
      .join("")}</div></section>${galleryPreview()}${assetNotice("Do not create fake photos. Upload verified production media and complete alt text before launch.")}`
  });
}

function videosPage() {
  return layout({
    title: "Videos",
    description: "Video library for homepage hype video, drone reel, POV footage, college, corporate, municipal, festival, nighttime, setup and testimonial footage.",
    path: "/videos",
    content: `${heroCompact("Video Library", "Support for homepage hype video, drone reel, POV footage, college events, corporate events, municipal events, festival footage, nighttime footage, setup footage and testimonials.", "Videos")}<section class="section"><div class="container card-grid three">${videoCategories
      .map((category) => `<article class="card"><h2>${escapeHtml(category)}</h2><p>Supports YouTube, Vimeo or self-hosted video, thumbnail, captions, transcript, category, related event type and related package.</p></article>`)
      .join("")}</div></section>${videoFeature()}`
  });
}

function caseStudiesPage() {
  return layout({
    title: "Case Studies",
    description: "Case study system for event goals, attendance, location, package, attractions, planning approach, execution, results, testimonials and media.",
    path: "/case-studies",
    content: `${heroCompact("Case Studies", "Document verified event goals, attendance, location, package, attractions, planning approach, execution, results, testimonial, gallery and video.", "Proof system")}${caseStudyPreview()}${assetNotice("Do not invent outcomes, statistics, client names or event results. Publish verified case studies only.")}`
  });
}

function faqPage() {
  return layout({
    title: "Frequently Asked Questions",
    description: "Frequently asked questions about mobile zipline space requirements, insurance, riders, travel, operators, permits and proposal planning.",
    path: "/frequently-asked-questions",
    schema: [faqSchema(20)],
    content: `${heroCompact("Frequently Asked Questions", "Planning answers for professional event organizers. Final feasibility, rider requirements and pricing always require staff review.", "FAQ")}${faqSection(20)}`
  });
}

function proposalPage() {
  return layout({
    title: "Request a Proposal",
    description: "Request a qualified event proposal for a premium mobile zipline experience beginning at $5,500+.",
    path: "/request-a-proposal",
    content: `${heroCompact("Request a Qualified Event Proposal", "Tell us about the venue, audience, event goals, budget range and site conditions so the team can recommend the right experience.", "Proposal")}<section class="section"><div class="container two-col"><div><h2>Experiences typically begin at $5,500.</h2><p>Large-scale municipal, corporate, university and brand activations commonly range from $15,000 to $40,000+ depending on location, duration, staffing, travel, access and production requirements.</p>${checkList(["Budget ranges from $5,500 to $40,000+", "Event type and audience qualification", "Preliminary space, surface and truck-access questions", "UTM and referring page capture ready", "CRM webhook integration prepared"])}</div><aside class="panel">${proposalForm()}</aside></div></section>`
  });
}

function proposalForm({ compact = false } = {}) {
  return `<form class="proposal-form" method="post" action="/api/proposals" data-proposal-form>
    <input type="hidden" name="landingPage" value="">
    <input type="hidden" name="utmSource" value="">
    <input type="hidden" name="utmMedium" value="">
    <input type="hidden" name="utmCampaign" value="">
    <input class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="form-grid">
      <label>Organization Name <input name="organizationName" required autocomplete="organization"></label>
      ${compact ? "" : `<label>Contact Name <input name="contactName" required autocomplete="name"></label>`}
      <label>Email <input type="email" name="email" required autocomplete="email"></label>
      <label>Phone Number <input type="tel" name="phone" required autocomplete="tel"></label>
      <label>Event Date <input type="date" name="eventDate" required></label>
      <label>Event Type ${select("eventType", ["College or University", "Corporate Event", "Municipal Event", "Festival or Fair", "Tourism Event", "Camp Program", "Brand Activation", "Marketing Agency", "Other"])}</label>
      <label>Estimated Attendance <input name="attendance" required></label>
      <label>Budget Range ${select("budgetRange", ["$5,500-$9,999", "$10,000-$14,999", "$15,000-$24,999", "$25,000-$39,999", "$40,000+", "Budget not finalized"])}</label>
      ${compact ? "" : `
      <label>Event Location <input name="eventLocation" required></label>
      <label>City <input name="city" required></label>
      <label>State <input name="state" required></label>
      <label>Approx. Available Length <input name="availableLength"></label>
      <label>Approx. Available Width <input name="availableWidth"></label>
      <label>Surface Type <input name="surfaceType"></label>
      <label>Indoor or Outdoor ${select("indoorOutdoor", ["Outdoor", "Indoor", "Not sure"])}</label>
      <label>Truck Access ${select("truckAccess", ["Yes", "No", "Not sure"])}</label>
      <label>Overhead Obstructions ${select("overheadObstructions", ["No known obstructions", "Yes", "Not sure"])}</label>
      <label>Desired Package ${select("desiredPackage", packages.map((pkg) => pkg.name).concat(["Not sure"]))}</label>
      <label>Branding Interest ${select("brandingInterest", ["Yes", "No", "Maybe"])}</label>`}
    </div>
    ${compact ? "" : `<label>Event Goals <textarea name="eventGoals" required></textarea></label><label>Additional Notes <textarea name="additionalNotes"></textarea></label><label class="consent"><input type="checkbox" name="consent" value="yes" required> I consent to being contacted about this proposal request.</label>`}
    <button class="button button-primary" type="submit">Request Proposal</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </form>`;
}

function contactPage() {
  return layout({
    title: "Contact",
    description: "Contact Tri-State Zipline Rental for premium mobile zipline experiences in New Jersey, New York, Pennsylvania and the Northeast.",
    path: "/contact",
    content: `${heroCompact("Contact Tri-State Zipline Rental", "Start a conversation about a premium mobile zipline experience for a professional event.", "Contact")}<section class="section"><div class="container card-grid three"><article class="card"><h2>Phone</h2><p><a data-track="phone" href="tel:${business.phoneHref}">${business.phoneDisplay} ${business.phoneSecondary}</a></p></article><article class="card"><h2>Email</h2><p><a data-track="email" href="mailto:${business.email}">${business.email}</a></p></article><article class="card"><h2>Region</h2><p>${escapeHtml(business.region)}</p></article></div></section>`
  });
}

function confirmationPage() {
  return layout({
    title: "Proposal Request Received",
    description: "Confirmation page for Tri-State Zipline Rental proposal requests.",
    path: "/proposal-confirmation",
    content: `<section class="hero hero-compact"><div class="container narrow"><p class="kicker">Proposal request received</p><h1>Thank you. Our team will review event fit and logistics.</h1><p>This page is ready for analytics conversion tracking. A confirmation should only appear after a real successful submission.</p><a class="button button-primary" href="/">Return Home</a></div></section>`
  });
}

function resourcesPage() {
  return standardPage("Resources", "Planning guides, safety information, FAQs, videos, case studies and blog resources for professional event buyers.", `<section class="section"><div class="container card-grid three">${[
    ["Event Planning", "/event-planning"],
    ["Safety", "/safety"],
    ["FAQs", "/frequently-asked-questions"],
    ["Videos", "/videos"],
    ["Case Studies", "/case-studies"],
    ["Blog", "/blog"]
  ]
    .map(([title, href]) => `<a class="card resource-card" href="${href}"><h2>${title}</h2><p>Open ${title.toLowerCase()} resources.</p></a>`)
    .join("")}</div></section>`);
}

function blogPage() {
  return layout({
    title: "Blog",
    description: "Professional event planning articles for mobile zipline experiences, college events, corporate engagement and municipal festivals.",
    path: "/blog",
    content: `${heroCompact("Resources and Planning Articles", "Launch article topics prepared for professional event buyers. Do not mass-generate thin SEO articles.", "Blog")}<section class="section"><div class="container card-grid two">${blogIdeas
      .map((title) => `<article class="card"><p class="kicker">Launch article idea</p><h2>${escapeHtml(title)}</h2><p>Draft this article with verified operational details and useful event-planning guidance before publishing.</p></article>`)
      .join("")}</div></section>`
  });
}

function policyPage(title) {
  return layout({
    title,
    description: `${title} for Tri-State Zipline Rental. Legal and compliance copy requires owner or attorney review before launch.`,
    path: `/${slugify(title)}`,
    content: `${heroCompact(title, "Legal and compliance copy requires attorney or owner review before production launch.", "Owner review required")}<section class="section"><div class="container narrow"><p>TODO: Verify with business owner before production. Replace this development placeholder with approved ${escapeHtml(title.toLowerCase())} language.</p></div></section>`
  });
}

function seoLandingPage(slug) {
  const item = seoPages[slug];
  return layout({
    title: item.title,
    description: item.copy,
    path: `/${slug}`,
    content: `${heroCompact(item.title, item.copy, "SEO landing page")}<section class="section"><div class="container two-col"><div><h2>Useful planning information for qualified buyers.</h2><p>${escapeHtml(item.angle)}</p>${checkList(["Relevant event examples and audience fit", "Recommended package paths", "Preliminary space and access considerations", "Safety and documentation overview", "Internal links to packages, planning, gallery and proposal request"])}</div><aside class="panel"><h2>Recommended starting point</h2><p>Review the Signature Zipline, Adventure Zone and relevant premium package options before requesting a proposal.</p><a class="button button-primary" href="/packages">View Packages</a></aside></div></section>${eventExamples()}${safetyOperations()}${galleryPreview()}${faqSection(6)}`
  });
}

function standardPage(title, description, extra = "") {
  const path = `/${slugify(title)}`;
  return layout({
    title,
    description,
    path,
    content: `${heroCompact(title, description, business.name)}${extra || safetyOperations()}${comparisonCta()}`
  });
}

function experiencesSection() {
  const cards = [
    ["Mobile Zipline", "The flagship staffed attraction and central draw.", "/mobile-zipline"],
    ["Adventure Zones", "Expanded attraction footprints with operational support.", "/packages"],
    ["Additional Attractions", "Add-on attractions subject to owner-approved scope.", "/request-a-proposal"],
    ["Brand Activations", "Sponsor-ready experiences for agencies and corporate brands.", "/brand-activations"]
  ];
  return `<section class="section" id="adventure-zones"><div class="container card-grid four">${cards
    .map(([title, copy, href]) => `<a class="card resource-card" href="${href}"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></a>`)
    .join("")}</div></section>`;
}

function notFoundPage() {
  return layout({
    title: "Page Not Found",
    description: "The requested page could not be found.",
    path: "/404",
    status: 404,
    content: `<section class="hero hero-compact"><div class="container narrow"><p class="kicker">404</p><h1>That page is off course.</h1><p>Use the navigation or request a proposal so our team can help you plan the right mobile zipline experience.</p><a class="button button-primary" href="/request-a-proposal">Request Proposal</a></div></section>`
  });
}

function heroCompact(title, copy, kicker = business.name) {
  return `<section class="hero hero-compact"><div class="container two-col"><div><p class="kicker">${escapeHtml(kicker)}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy)}</p><div class="actions"><a class="button button-primary" href="/request-a-proposal">Request Proposal</a><a class="button button-outline" href="/packages">View Packages</a></div></div>${mediaFrame()}</div></section>`;
}

function mediaFrame() {
  return `<figure class="media-frame"><img src="${business.referenceImage}" alt="Reference image showing a premium mobile zipline event layout" loading="lazy"><figcaption>Replace with owner-approved event photography before launch.</figcaption></figure>`;
}

function select(name, options) {
  return `<select name="${escapeHtml(name)}" required>${options.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}</select>`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function checkList(items) {
  return `<ul class="check-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function pricingDisclaimer() {
  return `<p class="disclaimer">Pricing varies by location, duration, travel, staffing, venue access, equipment selection, site conditions, permitting, and production requirements. Package contents require owner approval before production use.</p>`;
}

function assetNotice(copy) {
  return `<section class="section section-tight"><div class="container panel"><p class="kicker">Asset policy</p><p>${escapeHtml(copy)}</p></div></section>`;
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: business.name,
    description: business.secondaryTagline,
    url: "https://tristateziplinerental.com/",
    telephone: business.phoneDisplay,
    email: business.email,
    areaServed: ["New Jersey", "New York", "Pennsylvania", "Northeast United States"],
    parentOrganization: {
      "@type": "Organization",
      name: business.operatedBy
    }
  };
}

function faqSchema(limit = 20) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.slice(0, limit).map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a
      }
    }))
  };
}

module.exports = {
  page,
  escapeHtml,
  business,
  corePages,
  audiences,
  seoPages
};
