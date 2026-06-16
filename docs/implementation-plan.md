# Academic Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, maintainable academic website for GitHub Pages with sections for home, research, education, publications, supervision, demos, and contact.

**Architecture:** Use one static HTML file and data-driven JavaScript rendering for repeatable content. Keep content in `assets/data/site-data.js`, presentation in `assets/css/styles.css`, and behavior in `assets/js/main.js`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, GitHub Pages static hosting.

---

### Task 1: Scaffold Static Site

**Files:**
- Create: `index.html`
- Create: `.nojekyll`
- Create: `assets/css/styles.css`
- Create: `assets/js/main.js`
- Create: `assets/data/site-data.js`
- Create: `assets/img/research-visual.png`

- [x] Create the HTML shell with semantic sections and navigation.
- [x] Add a data file for profile, research themes, education, publications, supervision categories, demos, and links.
- [x] Add JavaScript rendering helpers for repeatable card/list sections.
- [x] Add responsive CSS for desktop and mobile layouts.
- [x] Add a generated visual asset for the hero/profile area.

### Task 2: Add Maintenance And Deployment Docs

**Files:**
- Create: `README.md`
- Create: `docs/maintenance.md`
- Create: `docs/deployment.md`
- Create: `docs/design.md`

- [x] Document how to edit content in `assets/data/site-data.js`.
- [x] Document public-safety rules for supervision content.
- [x] Document GitHub Pages deployment paths.
- [x] Document local preview commands.

### Task 3: Verify

**Files:**
- Inspect: all created website files.

- [ ] Run a local static server.
- [ ] Open the site in a browser and check layout at desktop and mobile widths.
- [ ] Confirm navigation and data-rendered sections are visible.
- [ ] Confirm there are no console errors.
