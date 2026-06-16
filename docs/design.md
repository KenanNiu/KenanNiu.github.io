# Kenan Niu Academic Website Design

## Goal

Create a maintainable personal academic website for Dr.ir. Kenan Niu that can be hosted as a GitHub Pages personal site and later expanded with detailed student supervision records, demos, thesis links, presentations, and videos.

## Audience

The site is for prospective students, collaborators, university colleagues, funding partners, and researchers who want to understand Kenan's research direction, teaching, publications, supervision style, and available project outputs.

## Architecture

The first version is a static HTML/CSS/JavaScript site. GitHub Pages can serve static HTML, CSS, and JavaScript directly, so the site avoids a build step and is easy to publish from a repository named `<github-username>.github.io`.

Most content lives in `assets/data/site-data.js`. The page renderer in `assets/js/main.js` reads that structured content and fills the repeatable sections. This keeps future maintenance focused on editing data arrays instead of changing HTML layout.

## Site Sections

- Home: identity, role, contact links, and a concise profile.
- Research: research themes and current research ambition.
- Education: study programs and courses.
- Publications: selected publications with links to full profiles.
- Student Supervision: maintainable category blocks for PhD, MSc, BSc, internships, demos, and thesis outputs.
- Demos: video/demo placeholders and content patterns for later media entries.
- Contact: email, office, profiles, and institutional links.

## Supervision Content Strategy

The supervision directory is large and includes private or administrative material. The first version uses only a quick folder-level skim to identify content types: PhD projects, MSc theses, BSc theses, internships, final reports, presentations, videos, demos, code archives, and datasets.

Future student entries should be added only after a public-safety pass. The website should not publish assessment forms, reimbursement files, contracts, CVs, consent forms, ethics forms, raw datasets, or private correspondence. Final thesis PDFs, public demos, public videos, and public presentations can be linked or copied only when Kenan confirms they are intended for public release.

## Visual Design

The design should feel like a serious academic lab/professor site: quiet, readable, fast, and professional. It uses restrained color, clear hierarchy, compact cards, and strong navigation rather than a marketing-style landing page.

The first viewport introduces Kenan, his role, and his research focus immediately. It also includes a generated research visual so the page does not feel text-only.

## Deployment

The website can be deployed in either of two ways:

1. Personal GitHub Pages site: push the contents of this folder to a repository named `<github-username>.github.io`.
2. Project GitHub Pages site: push this folder to any repository and configure GitHub Pages to publish from this folder or from a deployment branch.

For a personal `github.io` site, the repository root should contain `index.html`, `assets/`, `docs/`, and `.nojekyll`.
