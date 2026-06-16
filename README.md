# Kenan Niu Academic Website

Static personal academic website for GitHub Pages.

## Local Preview

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Maintain Content

Most editable content is in:

```text
assets/data/site-data.js
```

Edit the arrays for research themes, courses, publications, supervision categories, demos, and links. The page layout reads from this file automatically.

## Public-Safety Rule For Student Work

Do not publish student materials directly from the supervision archive without a review. Add only content that is intended to be public, such as final thesis links, public demo videos, public presentation files, and public code repositories.

Do not publish assessment forms, consent forms, ethics documents, contracts, CVs, reimbursement documents, grades, private feedback, raw datasets, or private correspondence.

## GitHub Pages

For a personal GitHub Pages site, create a repository named:

```text
<github-username>.github.io
```

The repository root should contain `index.html`, `.nojekyll`, `assets/`, `docs/`, and this `README.md`.
