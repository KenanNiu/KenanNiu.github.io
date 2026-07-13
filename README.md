# RVI Group Website

Static multi-page website for the Robotic Vision and Intelligence Group at the University of Twente.

The site is dependency-free and deploys directly to GitHub Pages. It includes a generated 70-record publication archive, licensed-image safeguards, RVI visual fallbacks, and a weekly ORCID/UT Pure/Crossref review workflow.

## Local Preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Maintenance

Publication data is generated from the reviewed Scholar baseline plus `maintenance/publications/curation.json`; do not edit the generated browser data directly. The scheduled workflow opens review-only pull requests and never merges automatically.

See `docs/maintenance.md` for publication generation, source updates, images, slides, people, projects, and public-safety rules. See `docs/deployment.md` for GitHub Pages deployment.
