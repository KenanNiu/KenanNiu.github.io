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
- Add publication records to `assets/data/publications-data.js`.
- Keep publication IDs unique and use the exact pillar IDs already present in the data.
- Link to DOI, publisher, UT Pure, or another stable public source.
- Label published work as `published`. Describe uncompleted reasoning or causality work as a research frontier.

## People and Projects

- Add confirmed public profiles in `assets/data/people-data.js`.
- Add systems, public demos, and project links in `assets/data/projects-data.js`.
- Do not invent names, roles, results, metrics, or media links.

## Paper Figures

Store confirmed figures in `assets/img/papers/`. Use a figure only when it is open access or the author has confirmed reuse. Include a source link and attribution in the page data. Leave the labelled figure placeholder when reuse has not been verified.

## Student Work Safety

Do not publish grades, assessment forms, private feedback, CVs, contracts, consent or ethics files, reimbursement material, raw personal or medical data, or private correspondence. Publish a thesis, presentation, code repository, or video only after public-release review.

## Local Checks

Run:

```bash
node --test tests/*.test.js
node scripts/update-hero-slides.js --check
python3 -m http.server 4173
```

Open `http://localhost:4173/` and check desktop and mobile navigation, slideshow controls, publication filters, external links, and all seven pages.
