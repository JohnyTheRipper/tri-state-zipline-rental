# Tri-State Zipline Rental Node.js Website

Node.js implementation for Tri-State Zipline Rental. This replaces the earlier WordPress direction and is the active deliverable.

## What Was Built

- Server-rendered Node.js website with no database dependency.
- Premium responsive design based on `Partners/premier_zipline.jpg`.
- Homepage with cinematic hero video placeholder, proposal qualification form, trust strip, audience sections, package overview, safety, gallery, testimonials, process and FAQ.
- Required core pages, audience pages and SEO landing pages.
- Proposal form API that stores submissions in `data/proposals.json`.
- Sitemap and robots routes.
- Accessible sticky navigation, dropdowns, mobile menu, Escape-key support and reduced-motion video fallback.
- Tracking hooks for GA4/GTM, Meta Pixel and proposal form events.

## Run Locally

```bash
npm start
```

Open:

```text
http://localhost:5174
```

## Active Stack

- Node.js
- Server-rendered HTML
- CSS
- Minimal vanilla JavaScript
- JSON file proposal storage

No WordPress, Elementor, Fluent Forms, Webflow, Wix, Squarespace or React build pipeline.

## Reference Asset

- Original reference: `../premier_zipline.jpg`
- App copy: `public/assets/premier_zipline.jpg`

Replace this reference image with approved production media before launch.

## Lead Data

Proposal submissions write to `data/proposals.json`. That file is intentionally gitignored so real lead data is not pushed. Use `data/proposals.example.json` as the committed placeholder.
