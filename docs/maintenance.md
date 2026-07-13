# RVI Group Website Maintenance

## Homepage Slides

1. Put approved image files in `assets/img/hero-slides/`.
2. Use JPG, PNG, WebP, AVIF, or SVG. Prefer a 4:3 image at 1600 x 1200 pixels or larger.
3. Run `node scripts/update-hero-slides.js` from the website root.
4. Edit the generated title, caption, pillar, and alt text in `assets/data/hero-slides.js` when the defaults are not descriptive enough.
5. Run `node scripts/update-hero-slides.js --check` before publishing.

The browser cannot scan a GitHub Pages folder directly. The generated manifest is the static index that makes the folder-based workflow possible.

## Research and Publications

- Edit the four research pillars in `assets/data/research-data.js`.
- Do not edit `assets/data/publications-data.js` directly; it is generated.
- The reviewed Google Scholar baseline is `maintenance/publications/scholar-2026-07-11.json`.
- Add DOI, type, pillar, summary, and verification corrections in `maintenance/publications/curation.json`, keyed by Scholar ID.
- Run `node scripts/generate-publications.js`, then `node scripts/generate-publications.js --check`.
- Link to DOI, publisher, UT Pure, or another stable public source.
- Label published work as `published`. Describe uncompleted reasoning or causality work as a research frontier.

### Source updates

The Monday GitHub workflow refreshes public ORCID and Crossref caches. UT Pure identifiers are read from the Pure Portal entries included in ORCID. It validates the complete site and opens a dated pull request only when cached metadata changes. It never scrapes Google Scholar, deletes baseline records, merges automatically, or pushes directly to `main`.

Review every automated PR before merging. Check unmatched additions, changed metadata, records absent from sources, and source failures. A failed run leaves the committed publication archive unchanged; inspect the uploaded `publication-update-report` artifact, correct the source or script, and rerun the workflow manually.

## People and Projects

- Add confirmed public profiles in `assets/data/people-data.js`.
- Add systems, public demos, and project links in `assets/data/projects-data.js`.
- Do not invent names, roles, results, metrics, or media links.

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
