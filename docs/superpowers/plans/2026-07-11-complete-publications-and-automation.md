# Complete Publications and Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish all 70 Google Scholar records, add licensed or fallback visuals to journal papers from 2022 onward, and create a weekly source-backed pull-request workflow for future publication updates.

**Architecture:** Keep the Scholar baseline as a checked-in maintenance snapshot and generate the public JavaScript dataset deterministically. Separate generated bibliography fields from curated classifications, summaries, and image licensing so scheduled updates cannot erase human decisions. A weekly GitHub Actions workflow reads ORCID, UT Pure, and Crossref, generates a candidate diff, validates it, and opens a pull request without scraping Scholar or merging automatically.

**Tech Stack:** Vanilla JavaScript, Node.js 22 built-in modules and `node:test`, static HTML/CSS, GitHub Actions, ORCID public data, UT Pure public metadata, Crossref REST API.

## Global Constraints

- Google Scholar defines the initial 70-entry coverage and ordering baseline.
- Include every Scholar-listed output type.
- Do not scrape Google Scholar from GitHub Actions or at website runtime.
- Copy paper images only when reuse licensing is explicit; otherwise use a local RVI fallback.
- Do not hot-link publisher images.
- Scheduled updates create pull requests and never merge or push directly to `main`.
- A source failure or omission must never delete or empty committed publication data.
- Complete locally verified work before any GitHub push.

---

### Task 1: Scholar Baseline Snapshot and Normalization Contract

**Files:**
- Create: `maintenance/publications/scholar-2026-07-11.json`
- Create: `maintenance/publications/curation.json`
- Create: `scripts/lib/publication-normalizer.js`
- Create: `scripts/generate-publications.js`
- Create: `tests/publication-generation.test.js`
- Replace: `assets/data/publications-data.js`

**Interfaces:**
- `scholar-2026-07-11.json` contains `{capturedAt, profileUrl, sort, expectedCount, records}`.
- Each source record contains `{scholarId, scholarUrl, title, authorsDisplay, venueDisplay, year, citedBy}`.
- `normalizeRecord(source, curation)` returns the full publication data contract from the approved spec.
- `generate-publications.js --check` exits nonzero when generated output differs from the committed file.

- [ ] **Step 1: Capture the complete visible Scholar table**

Use the visible Scholar profile with `pagesize=100&sortby=pubdate`. Read all article rows, store 70 records, and preserve the Scholar citation ID parsed from `citation_for_view`. Do not store cookies, profile session data, or page HTML.

- [ ] **Step 2: Write failing generation tests**

```js
test("Scholar baseline contains exactly 70 unique records", () => {
  const snapshot = JSON.parse(fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8"));
  assert.equal(snapshot.expectedCount, 70);
  assert.equal(snapshot.records.length, 70);
  assert.equal(new Set(snapshot.records.map(item => item.scholarId)).size, 70);
});

test("normalizer preserves unresolved records without inventing fields", () => {
  const result = normalizeRecord({ scholarId: "x", title: "Paper", authorsDisplay: "K Niu", venueDisplay: "", year: null }, {});
  assert.equal(result.type, "other");
  assert.equal(result.metadataStatus, "review");
  assert.equal(result.year, null);
});
```

- [ ] **Step 3: Run tests and verify RED**

Run: `node --test tests/publication-generation.test.js`

Expected: FAIL because the snapshot and normalizer do not exist.

- [ ] **Step 4: Implement deterministic normalization and generation**

Implement title normalization, stable slug generation, Scholar URL expansion, type validation, pillar fallback, metadata status, curated-field overlay, and a serializer that writes `window.rviPublications = ...;`. Keep `curation.json` keyed by `scholarId` so later source regeneration preserves DOI, type, summary, pillar, image, licence, and verification data.

- [ ] **Step 5: Generate the 70-record dataset and verify GREEN**

Run:

```bash
node scripts/generate-publications.js
node scripts/generate-publications.js --check
node --test tests/publication-generation.test.js
```

Expected: generator check exits 0 and all generation tests pass with 70 records.

- [ ] **Step 6: Commit**

```bash
git add maintenance/publications assets/data/publications-data.js scripts/lib/publication-normalizer.js scripts/generate-publications.js tests/publication-generation.test.js
git commit -m "feat: add complete Scholar publication baseline"
```

### Task 2: Verified Metadata Enrichment and Deduplication

**Files:**
- Create: `scripts/lib/publication-sources.js`
- Create: `scripts/update-publications.js`
- Create: `maintenance/publications/source-cache/orcid-works.json`
- Create: `maintenance/publications/source-cache/crossref.json`
- Modify: `maintenance/publications/curation.json`
- Modify: `tests/publication-generation.test.js`

**Interfaces:**
- `normalizeDoi(value)` returns a lowercase DOI without URL prefix.
- `normalizeTitle(value)` returns a punctuation-insensitive comparison key.
- `matchCandidate(existing, candidate)` prioritizes DOI, then UT Pure source ID, then exact normalized title.
- `update-publications.js --offline --check` verifies cached-source behavior without network access.

- [ ] **Step 1: Write failing match and non-deletion tests**

```js
test("matching prioritizes DOI over title", () => {
  const match = matchCandidate([{ scholarId: "a", doi: "10.1/x", title: "Old title" }], { doi: "https://doi.org/10.1/X", title: "New title" });
  assert.equal(match.scholarId, "a");
});

test("source omissions never delete committed records", () => {
  const result = mergeCandidates([{ scholarId: "a", title: "Existing" }], []);
  assert.equal(result.records.length, 1);
  assert.equal(result.report.missingFromSources.length, 1);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/publication-generation.test.js`

Expected: FAIL because source matching and merge functions do not exist.

- [ ] **Step 3: Fetch and cache public metadata**

Read ORCID works for `0000-0002-5498-4311`, UT Pure-linked identifiers present in ORCID, and Crossref records for normalized DOIs. Cache raw responses for reproducible tests. Do not commit credentials; use unauthenticated public endpoints where allowed.

- [ ] **Step 4: Implement enrichment, deduplication, and reports**

Return `{records, report}` where report contains `newRecords`, `changedFields`, `reviewRequired`, `missingFromSources`, `imageRequired`, and `sourceFailures`. Only update fields supported by stronger source metadata. Never remove existing records.

- [ ] **Step 5: Verify offline and live modes**

Run:

```bash
node scripts/update-publications.js --offline --check
node --test tests/publication-generation.test.js
```

Expected: cached data produces no duplicate Scholar IDs and preserves all 70 baseline entries.

- [ ] **Step 6: Commit**

```bash
git add scripts maintenance/publications/source-cache maintenance/publications/curation.json tests/publication-generation.test.js assets/data/publications-data.js
git commit -m "feat: enrich publication metadata from public sources"
```

### Task 3: Publication Type and Research-Pillar Filtering

**Files:**
- Modify: `assets/js/publication-filter.js`
- Modify: `assets/js/publications.js`
- Modify: `publications.html`
- Modify: `tests/publication-filter.test.js`
- Modify: `tests/site-data.test.js`

**Interfaces:**
- `RVIPublications.filter(items, {year, type, pillar})` returns a new array.
- The page exposes `#year-filter`, `#type-filter`, `#pillar-filter`, and `#result-count`.

- [ ] **Step 1: Extend failing filter tests**

```js
test("filters by year, type, and pillar together", () => {
  const result = filter(items, { year: "2025", type: "journal", pillar: "motion-intelligence" });
  assert.deepEqual(result.map(item => item.scholarId), ["journal-motion"]);
});
```

Add data-contract assertions for exactly 70 records, valid types, unique IDs and Scholar IDs, and a stable Scholar URL on every record.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/publication-filter.test.js tests/site-data.test.js`

Expected: FAIL because type filtering and 70-record data do not yet satisfy the page contract.

- [ ] **Step 3: Implement type filter and accessible counts**

Add `All types` plus journal, conference, abstract, preprint, chapter, thesis, poster, and other options. Render metadata-review labels without excluding records. Preserve the Scholar publication-date order after filtering.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test tests/publication-filter.test.js tests/site-data.test.js`

Expected: all filtering and publication-contract tests pass.

- [ ] **Step 5: Commit**

```bash
git add assets/js/publication-filter.js assets/js/publications.js publications.html tests/publication-filter.test.js tests/site-data.test.js
git commit -m "feat: add complete publication archive filters"
```

### Task 4: Licensed Journal Visuals and Fallback Assets

**Files:**
- Create: `assets/img/publications/`
- Create: `assets/img/publication-fallbacks/vision-imaging.svg`
- Create: `assets/img/publication-fallbacks/learning-reasoning.svg`
- Create: `assets/img/publication-fallbacks/spatial-intelligence.svg`
- Create: `assets/img/publication-fallbacks/motion-intelligence.svg`
- Create: `assets/img/publication-fallbacks/other.svg`
- Modify: `maintenance/publications/curation.json`
- Create: `maintenance/publications/image-sources.json`
- Create: `tests/publication-images.test.js`

**Interfaces:**
- `image-sources.json` contains `{scholarId, localPath, sourceUrl, credit, license}`.
- A copied paper image is valid only when `license` is a verified reusable licence and `localPath` exists.
- Every 2022-or-later journal record has either a licensed local image or a pillar fallback.

- [ ] **Step 1: Write failing image-policy tests**

```js
test("copied paper images have a source and reusable licence", () => {
  sources.forEach(source => {
    assert.match(source.sourceUrl, /^https:\/\//);
    assert.ok(["CC BY 4.0", "CC BY 3.0", "CC0"].includes(source.license));
    assert.ok(fs.existsSync(source.localPath));
  });
});

test("every journal paper from 2022 onward has an image or fallback", () => {
  recentJournals.forEach(item => assert.ok(item.image));
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/publication-images.test.js`

Expected: FAIL because image records and fallback files do not exist.

- [ ] **Step 3: Audit recent journal licences and select figures**

For each 2022-or-later journal paper, inspect the publisher or open-access full text. Select graphical abstract, method/system overview, representative Figure 1, or fallback in that order. Record the source and licence before downloading. Do not copy an image when the licence is unclear.

- [ ] **Step 4: Add licensed local images and five professional fallbacks**

Store paper images with stable publication IDs. Create restrained RVI fallback SVGs using each pillar's number, title, and accent, without pretending the fallback is a paper figure. Update curation and image-source metadata.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `node scripts/generate-publications.js && node --test tests/publication-images.test.js`

Expected: all recent journals resolve to a valid local image and every copied figure has licence evidence.

- [ ] **Step 6: Commit**

```bash
git add assets/img/publications assets/img/publication-fallbacks maintenance/publications/curation.json maintenance/publications/image-sources.json assets/data/publications-data.js tests/publication-images.test.js
git commit -m "feat: add licensed publication visuals and fallbacks"
```

### Task 5: Visual Chronological Publication Layout

**Files:**
- Modify: `assets/js/publications.js`
- Modify: `assets/css/styles.css`
- Modify: `tests/pages.test.js`

**Interfaces:**
- A 2022-or-later journal record renders `.publication-item.visual` with `.publication-thumbnail`.
- Other records render `.publication-item.compact`.
- Image errors replace the failed source with `data-fallback` and add `.uses-fallback`.

- [ ] **Step 1: Add failing static layout assertions**

Assert that the renderer includes visual/compact variants, thumbnail alt text, image source links, and an error fallback handler. Assert CSS includes fixed thumbnail aspect ratio and mobile stacked layout.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/pages.test.js`

Expected: FAIL because publication visual variants are not implemented.

- [ ] **Step 3: Implement visual and compact renderers**

Render image, type/year, title, authors, venue, summary, DOI/Scholar links, research tags, metadata status, and image source. Keep compact rows text-first. On image error, swap once to the record's fallback and preserve meaningful alt text.

- [ ] **Step 4: Implement responsive CSS**

Use a stable 240 x 160-equivalent thumbnail region on desktop and a full-width 3:2 image on mobile. Ensure long titles wrap, controls do not shift, and compact rows remain scannable.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `node --test tests/pages.test.js tests/publication-filter.test.js`

Expected: all layout and filter tests pass.

- [ ] **Step 6: Commit**

```bash
git add assets/js/publications.js assets/css/styles.css tests/pages.test.js
git commit -m "feat: add visual publication archive layout"
```

### Task 6: Weekly Pull-Request Automation

**Files:**
- Create: `.github/workflows/update-publications.yml`
- Create: `scripts/write-publication-report.js`
- Create: `tests/publication-automation.test.js`
- Modify: `docs/maintenance.md`

**Interfaces:**
- Workflow triggers on Monday schedule and `workflow_dispatch`.
- Workflow permissions are `contents: write` and `pull-requests: write`.
- `write-publication-report.js` creates Markdown sections for added, changed, review-required, missing-source, image-required, and source-failure items.
- Workflow creates `automated/publication-update-YYYY-MM-DD` only when generated files change.

- [ ] **Step 1: Write failing workflow-contract tests**

Parse the workflow as text and assert schedule, manual trigger, explicit permissions, Node setup, update script, full tests, no-change exit, branch prefix, and `gh pr create` are present. Test report output against a fixed sample diff.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/publication-automation.test.js`

Expected: FAIL because workflow and report writer do not exist.

- [ ] **Step 3: Implement report writer and scheduled workflow**

The workflow checks out `main`, runs Node 22, fetches current source metadata, generates candidate data, runs all tests, detects changes with `git diff --quiet`, commits only generated publication files and reports, pushes a dated automation branch, and creates a PR with `gh pr create`. Use `GITHUB_TOKEN`; store no external secrets.

- [ ] **Step 4: Add failure and concurrency protections**

Add a workflow concurrency group that prevents overlapping update runs. Make source fetch failure exit before any commit. Preserve cached/current data and upload the report as a workflow artifact when validation fails.

- [ ] **Step 5: Run tests and dry-run verification**

Run:

```bash
node --test tests/publication-automation.test.js
node scripts/update-publications.js --offline --check
git diff --check
```

Expected: workflow-contract tests pass and unchanged cached inputs produce no generated diff.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/update-publications.yml scripts/write-publication-report.js tests/publication-automation.test.js docs/maintenance.md
git commit -m "feat: automate publication update pull requests"
```

### Task 7: Full Verification and Local Review

**Files:**
- Modify: `README.md`
- Modify: `docs/maintenance.md`

**Interfaces:**
- Produces a locally served, complete 70-record archive ready for user review.

- [ ] **Step 1: Run complete automated verification**

Run:

```bash
node scripts/generate-publications.js --check
node scripts/update-publications.js --offline --check
node --test tests/*.test.js
node --check assets/js/publication-filter.js
node --check assets/js/publications.js
node --check scripts/generate-publications.js
node --check scripts/update-publications.js
python3 /Users/k.niu/.codex/skills/academic-github-pages-site/scripts/check_static_site.py .
git diff --check
```

Expected: all commands exit 0 and the dataset contains exactly 70 unique Scholar records.

- [ ] **Step 2: Run browser acceptance**

Serve locally and verify desktop and 390-pixel mobile layouts, all three filters, result counts, recent journal thumbnails, image source links, forced missing-image fallback, compact older entries, navigation, console errors, horizontal overflow, and text overlap.

- [ ] **Step 3: Review workflow without publishing**

Inspect the workflow permissions, branch naming, no-change behavior, and PR body. Do not push or manually trigger the GitHub workflow before user approval.

- [ ] **Step 4: Update maintenance documentation and commit**

Document Scholar baseline refresh, source-cache refresh, manual metadata curation, image licence records, fallback replacement, weekly PR review, and recovery from a failed workflow.

```bash
git add README.md docs/maintenance.md
git commit -m "docs: explain complete publication maintenance"
```

- [ ] **Step 5: Present local preview**

Keep the local server running, report the preview URL, test evidence, image coverage, unresolved metadata count, and automation status. Do not push until Kenan explicitly approves.
