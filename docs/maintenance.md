# RVI Group Website Maintenance

## Homepage Slides

The Full Website homepage now uses a source-audited robotic-ultrasound setup photograph in `assets/img/orthopedics/`. The concise site retains its supplied research-direction diagram. The slideshow files and the following instructions are retained for a future return to slideshow presentation; they are not active on the current homepage.

1. Put approved image files in `assets/img/hero-slides/`.
2. Use JPG, PNG, WebP, AVIF, or SVG. Prefer a 4:3 image at 1600 x 1200 pixels or larger.
3. Run `node scripts/update-hero-slides.js` from the website root.
4. Edit the generated title, caption, pillar, and alt text in `assets/data/hero-slides.js` when the defaults are not descriptive enough.
5. Run `node scripts/update-hero-slides.js --check` before publishing.

The browser cannot scan a GitHub Pages folder directly. The generated manifest is the static index that makes the folder-based workflow possible.

## Research and Publications

- Edit the five research capabilities in `assets/data/research-data.js`, including `digital-twins`. Keep the shared palette in `assets/css/research-colors.css` aligned.
- Digital Twins labels cover direct twin research and related modelling, reconstruction or simulation foundations. Record the distinction and evidence in publication curation, project `mappingBasis`, or student project `mappingBasis`; a tag alone does not establish a validated physical-digital feedback loop.
- Do not edit `assets/data/publications-data.js` directly; it is generated.
- The reviewed Google Scholar baseline is `maintenance/publications/scholar-2026-07-11.json`.
- Add DOI, type, pillar, summary, and verification corrections in `maintenance/publications/curation.json`, keyed by Scholar ID.
- Run `node scripts/generate-publications.js`, then `node scripts/generate-publications.js --check`.
- Link to DOI, publisher, UT Pure, or another stable public source.
- Label published work as `published`. Describe uncompleted reasoning or causality work as a research frontier.

### Source updates

Publication automation was disabled on October 14, 2026. Its source is archived in `maintenance/disabled-workflows/`; GitHub Pages deployment remains active. Source-cache and publication updates are now manual. The archived July 2026 Scholar baseline is not a live feed.

After updating publication data, run `node scripts/build-simple-site.js` to rebuild the concise static page at `/simple/`. Its original counterpart remains available at `/`. See `docs/simple-site.md` for details.

## People and Projects

- Add confirmed public profiles in `assets/data/people-data.js`.
- Add systems, public demos, and project links in `assets/data/projects-data.js`.
- Do not invent names, roles, results, metrics, or media links.

The six research systems in `projects-data.js` correspond to the native images listed in `maintenance/orthopedics-assets.json`. Keep slide evidence and scientific interpretation consistent when changing summaries or captions. Retain `object-fit: contain` so scientific labels and plots are not cropped. Only confirmed people render publicly; placeholder member data is retained privately in the source dataset but not shown.

## Paper Figures

Store confirmed figures in `assets/img/publications/`. Use a figure only when its reuse licence is explicit. Record its Scholar ID, local path, source URL, credit, and licence in `maintenance/publications/image-sources.json`, then add the same fields in curation. When permission is unclear, keep the RVI fallback in `assets/img/publication-fallbacks/`; do not hot-link or copy the publisher image.

## Student Work Safety

Do not publish grades, assessment forms, private feedback, CVs, contracts, consent or ethics files, reimbursement material, raw personal or medical data, or private correspondence. Publish a thesis, presentation, code repository, or video only after public-release review.

## Local Checks

Run:

```bash
node --test tests/*.test.js
node scripts/generate-publications.js --check
node scripts/update-publications.js --offline --check
node scripts/update-hero-slides.js --check
python3 -m http.server 4173
```

Open `http://localhost:4173/` and check desktop and mobile navigation, slideshow controls, publication filters, external links, and all seven pages.
