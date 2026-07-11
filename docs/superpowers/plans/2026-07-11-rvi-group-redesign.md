# RVI Group Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current personal one-page site with a maintainable, evidence-led, multi-page RVI Group website and a folder-driven homepage slideshow.

**Architecture:** Use dependency-free HTML, CSS, and JavaScript that GitHub Pages can serve directly. Shared data modules expose structured browser globals; small page-specific renderers consume them. Node's built-in test runner verifies data contracts, static page structure, filters, and slideshow behavior without adding a package dependency.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js `node:test`, GitHub Pages.

## Global Constraints

- Do not push the implementation to GitHub before Kenan approves the local preview.
- Use restrained academic wording and do not explicitly criticize large language models or embodied intelligence.
- Distinguish published evidence from active research frontiers.
- Use only open-access or author-approved paper figures; otherwise show a labelled placeholder.
- Do not invent members, projects, publications, results, metrics, or demos.
- Keep repeatable content data-driven and editable without changing page markup.
- Preserve keyboard access, reduced-motion support, useful image alt text, and readable no-JavaScript content.

---

### Task 1: Data Contracts and Verified Initial Content

**Files:**
- Create: `tests/site-data.test.js`
- Replace: `assets/data/site-data.js`
- Create: `assets/data/research-data.js`
- Create: `assets/data/publications-data.js`
- Create: `assets/data/people-data.js`
- Create: `assets/data/projects-data.js`

**Interfaces:**
- Produces: `window.rviSite`, `window.rviResearch`, `window.rviPublications`, `window.rviPeople`, and `window.rviProjects` browser globals.
- Each publication produces `{year, title, authors, venue, url, pillars, evidence}`.
- Each research pillar produces `{id, number, title, shortTitle, question, claim, summary, accent, representativePublicationIds, next}`.

- [ ] **Step 1: Write failing data-contract tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function load(file) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context);
  return context.window;
}

test("defines four distinct research pillars", () => {
  const data = load("assets/data/research-data.js").rviResearch;
  assert.equal(data.length, 4);
  assert.deepEqual(Array.from(data, item => item.id), ["vision-imaging", "learning-reasoning", "spatial-intelligence", "motion-intelligence"]);
});

test("all publications have evidence labels and valid pillar tags", () => {
  const publications = load("assets/data/publications-data.js").rviPublications;
  const allowed = new Set(["vision-imaging", "learning-reasoning", "spatial-intelligence", "motion-intelligence"]);
  assert.ok(publications.length >= 8);
  publications.forEach(publication => {
    assert.ok(["published", "frontier"].includes(publication.evidence));
    assert.ok(publication.pillars.every(pillar => allowed.has(pillar)));
    assert.match(publication.url, /^https:\/\//);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/site-data.test.js`

Expected: FAIL because the new data modules do not exist.

- [ ] **Step 3: Implement the data modules**

Populate the five browser globals with verified public profile information, the four approved research pillars, at least eight verified publication records, Kenan as Group Lead, explicit future-member placeholders, and honest project/demo placeholders. Use the exact interfaces above and full source URLs.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/site-data.test.js`

Expected: all data-contract tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/site-data.test.js assets/data/
git commit -m "feat: add RVI Group content model"
```

### Task 2: Multi-Page Semantic Structure

**Files:**
- Create: `tests/pages.test.js`
- Replace: `index.html`
- Create: `research.html`
- Create: `publications.html`
- Create: `people.html`
- Create: `projects.html`
- Create: `education.html`
- Create: `about.html`
- Create: `assets/js/common.js`

**Interfaces:**
- Consumes: all Task 1 browser globals.
- Produces: seven static pages with a shared `.site-header`, `[data-site-nav]`, `.site-footer`, skip link, active-page marker, and page-specific main landmark.
- Produces: `window.RVI.createElement(tag, className, text)` and `window.RVI.externalLink(item, className)`.

- [ ] **Step 1: Write failing page-structure tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const pages = ["index.html", "research.html", "publications.html", "people.html", "projects.html", "education.html", "about.html"];

test("all pages expose shared navigation and accessible landmarks", () => {
  pages.forEach(page => {
    const html = fs.readFileSync(page, "utf8");
    assert.match(html, /class="skip-link"/);
    assert.match(html, /data-site-nav/);
    assert.match(html, /<main/);
    assert.match(html, /class="site-footer"/);
    assert.match(html, /assets\/js\/common\.js/);
  });
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/pages.test.js`

Expected: FAIL because the six inner pages do not exist and the current homepage lacks the new shared contract.

- [ ] **Step 3: Implement semantic page shells and shared navigation**

Create the seven approved pages, include meaningful non-JavaScript introductory content in each page, add shared navigation with `aria-current="page"`, and implement the mobile navigation toggle and shared helpers in `assets/js/common.js`.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/pages.test.js`

Expected: all page-structure tests pass.

- [ ] **Step 5: Commit**

```bash
git add index.html research.html publications.html people.html projects.html education.html about.html assets/js/common.js tests/pages.test.js
git commit -m "feat: add RVI Group page architecture"
```

### Task 3: Homepage Manifesto and Folder-Driven Slideshow

**Files:**
- Create: `tests/hero-slides.test.js`
- Create: `assets/data/hero-slides.js`
- Create: `assets/js/slideshow-core.js`
- Create: `assets/js/home.js`
- Create: `scripts/update-hero-slides.js`
- Create: `assets/img/hero-slides/slide-a.svg`
- Create: `assets/img/hero-slides/slide-b.svg`
- Create: `assets/img/hero-slides/slide-c.svg`
- Create: `assets/img/hero-slides/slide-d.svg`
- Create: `assets/img/hero-slides/slide-e.svg`
- Create: `assets/img/hero-slides/slide-f.svg`
- Modify: `index.html`

**Interfaces:**
- Consumes: `window.rviResearch` and `window.rviHeroSlides`.
- Produces: `window.RVISlideshow.nextIndex(current, length)`, `previousIndex(current, length)`, and `shouldAutoplay({reducedMotion, hovered, focused})`.
- The manifest generator writes `{src, alt, title, caption, pillar}` entries to `window.rviHeroSlides` in deterministic filename order.

- [ ] **Step 1: Write failing slideshow behavior tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadCore() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/js/slideshow-core.js", "utf8"), context);
  return context.window.RVISlideshow;
}

test("slideshow wraps in both directions", () => {
  const core = loadCore();
  assert.equal(core.nextIndex(5, 6), 0);
  assert.equal(core.previousIndex(0, 6), 5);
});

test("autoplay stops for reduced motion, hover, or focus", () => {
  const core = loadCore();
  assert.equal(core.shouldAutoplay({ reducedMotion: true, hovered: false, focused: false }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: true, focused: false }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: false, focused: true }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: false, focused: false }), true);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/hero-slides.test.js`

Expected: FAIL because slideshow core does not exist.

- [ ] **Step 3: Implement pure slideshow logic and verify GREEN**

Implement modulo-based index helpers and the autoplay predicate in `slideshow-core.js`, then run `node --test tests/hero-slides.test.js` and expect all tests to pass.

- [ ] **Step 4: Add failing manifest-generator test**

Extend `tests/hero-slides.test.js` to run `node scripts/update-hero-slides.js --check` and assert that all six source images appear in the manifest in sorted order.

- [ ] **Step 5: Run the generator test and verify RED**

Run: `node --test tests/hero-slides.test.js`

Expected: FAIL because the generator, manifest, and placeholder slide files do not exist.

- [ ] **Step 6: Implement placeholders, generator, manifest, and homepage renderer**

Create six accessible lettered SVG placeholders. Implement the generator using `fs.readdirSync`, sorted supported extensions, JSON serialization, and a `--check` mode. Implement a five-second carousel with previous/next controls, position indicators, keyboard navigation, touch swipes, hover/focus pause, reduced-motion handling, captions, and missing-image fallback. Render the four pillars and selected evidence below the manifesto.

- [ ] **Step 7: Run tests and verify GREEN**

Run: `node --test tests/hero-slides.test.js`

Expected: all slideshow and manifest tests pass.

- [ ] **Step 8: Commit**

```bash
git add index.html assets/data/hero-slides.js assets/js/slideshow-core.js assets/js/home.js assets/img/hero-slides scripts/update-hero-slides.js tests/hero-slides.test.js
git commit -m "feat: add RVI manifesto and hero slideshow"
```

### Task 4: Research, Publications, People, Projects, and Education Rendering

**Files:**
- Create: `tests/publication-filter.test.js`
- Create: `assets/js/publication-filter.js`
- Create: `assets/js/research.js`
- Create: `assets/js/publications.js`
- Create: `assets/js/people.js`
- Create: `assets/js/projects.js`
- Create: `assets/js/education.js`
- Modify: `research.html`
- Modify: `publications.html`
- Modify: `people.html`
- Modify: `projects.html`
- Modify: `education.html`

**Interfaces:**
- Consumes: Task 1 data globals and Task 2 shared helpers.
- Produces: `window.RVIPublications.filter(items, {year, pillar})` returning a filtered array without mutating input.
- Produces: rendered research evidence, publication controls, Group Lead profile, honest placeholders, course list, and thesis/supervision entry points.

- [ ] **Step 1: Write failing publication-filter tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

test("filters by year and pillar without mutating publications", () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/js/publication-filter.js", "utf8"), context);
  const items = [
    { year: 2026, pillars: ["motion-intelligence"] },
    { year: 2025, pillars: ["vision-imaging", "spatial-intelligence"] }
  ];
  const snapshot = JSON.stringify(items);
  const result = context.window.RVIPublications.filter(items, { year: "2025", pillar: "spatial-intelligence" });
  assert.equal(result.length, 1);
  assert.equal(JSON.stringify(items), snapshot);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/publication-filter.test.js`

Expected: FAIL because the filter module does not exist.

- [ ] **Step 3: Implement the filter and page renderers**

Implement exact-match year and pillar filtering with `all` as the no-filter value. Render each approved page from the structured data, including source links, evidence/frontier labels, accessible filter controls, explicit empty states, and open-access figure placeholders with attribution fields.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/publication-filter.test.js`

Expected: all publication-filter tests pass.

- [ ] **Step 5: Commit**

```bash
git add research.html publications.html people.html projects.html education.html assets/js/research.js assets/js/publications.js assets/js/publication-filter.js assets/js/people.js assets/js/projects.js assets/js/education.js tests/publication-filter.test.js
git commit -m "feat: render RVI research and group content"
```

### Task 5: Visual System, Documentation, and Local Acceptance

**Files:**
- Replace: `assets/css/styles.css`
- Modify: `about.html`
- Modify: `README.md`
- Replace: `docs/maintenance.md`
- Modify: `docs/deployment.md`
- Modify: `tests/pages.test.js`

**Interfaces:**
- Consumes: all previous page structures and CSS class names.
- Produces: a responsive dark manifesto homepage, bright evidence-oriented inner pages, four non-color-only pillar identities, and maintenance instructions for slides and data.

- [ ] **Step 1: Extend page tests with asset and metadata assertions**

Add assertions that every page references `assets/css/styles.css`, has a unique title and meta description, and contains no obsolete personal-site title or `research-visual.png` reference.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/pages.test.js`

Expected: FAIL until all pages have final metadata and obsolete references are removed.

- [ ] **Step 3: Implement the complete responsive visual system and documentation**

Build the approved charcoal-green manifesto hero, warm-white inner pages, restrained red/teal/blue/gold pillar accents, stable slideshow dimensions, compact research evidence layouts, responsive mobile navigation, focus states, reduced-motion rules, and no-JavaScript readability. Document exactly how to add slides, publications, people, projects, figures, and public supervision content.

- [ ] **Step 4: Run automated verification**

Run:

```bash
node --test tests/*.test.js
node --check assets/js/common.js
node --check assets/js/home.js
node --check assets/js/research.js
node --check assets/js/publications.js
node --check assets/js/people.js
node --check assets/js/projects.js
node --check assets/js/education.js
python3 /Users/k.niu/.codex/skills/academic-github-pages-site/scripts/check_static_site.py .
git diff --check
```

Expected: all tests pass, all JavaScript syntax checks succeed, the static-site checker reports OK, and `git diff --check` returns no output.

- [ ] **Step 5: Run local browser acceptance**

Serve the site on an available local port. Inspect the homepage and every inner page at desktop, tablet, and mobile widths. Verify navigation, slideshow controls and timing, reduced motion, publication filters, missing-image fallback, keyboard focus, external links, console errors, horizontal overflow, and text overlap.

- [ ] **Step 6: Commit the locally accepted implementation**

```bash
git add assets/css/styles.css about.html README.md docs/maintenance.md docs/deployment.md tests/pages.test.js
git commit -m "feat: complete RVI Group website redesign"
```

- [ ] **Step 7: Present local preview without pushing**

Keep the local server running and report its URL. Summarize verified pages and known placeholders. Do not run `git push` until Kenan explicitly approves the local website.
