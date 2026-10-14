# RVI Group Website

Static multi-page website for the Robotic Vision and Intelligence Group at the University of Twente.

The site is dependency-free and deploys directly to GitHub Pages. The concise static version is at https://kenanniu.github.io/simple/; the original multi-page version remains at the root. Both use the reviewed 70-record publication archive. Publication automation is disabled.

## Local Preview

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

## Maintenance

Publication data is generated from the reviewed Scholar baseline plus `maintenance/publications/curation.json`; do not edit the generated browser data directly. After updating it, run `node scripts/build-simple-site.js` to refresh the concise static page. See `docs/simple-site.md` for the optional image and concise page maintenance.

See `docs/maintenance.md` for publication generation, source updates, images, slides, people, projects, and public-safety rules. See `docs/deployment.md` for GitHub Pages deployment.
