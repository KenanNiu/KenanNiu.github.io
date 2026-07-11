# Complete Publications and Journal Visuals

## Objective

Replace the selected-publication dataset with the complete Google Scholar publication list and enrich journal papers from 2022 onward with licensed graphical abstracts or representative figures.

The Google Scholar profile contained 70 visible entries when inspected on 11 July 2026 with `pagesize=100` and publication-date sorting. The website must preserve those 70 entries as the canonical coverage target.

Implementation will be reviewed locally before any GitHub push.

## Source Strategy

Google Scholar defines list membership, displayed title, and default publication-date order. Each record is then checked against DOI metadata, ORCID, University of Twente Pure, and publisher pages where available.

This hybrid strategy is required because:

- Scholar is the user-selected canonical list but automated HTTP access commonly returns 403.
- ORCID and UT Pure provide stronger structured metadata but do not necessarily have identical coverage.
- DOI and publisher records are needed to verify publication type, stable links, open-access status, and image licensing.

A saved Scholar snapshot will support repeatable local generation. The public website will not scrape Scholar at runtime.

## Included Output Types

All Scholar entries are included, covering:

- Journal articles.
- Conference papers.
- Conference abstracts.
- Preprints.
- Book chapters.
- PhD thesis.
- Posters and other Scholar-listed academic outputs.

Each entry receives one normalized type. An entry whose type cannot be confirmed remains visible with `other` or `metadata review`; no type is invented.

## Publication Data Contract

Each publication record contains:

- `id`: stable unique slug.
- `scholarId`: Google Scholar citation identifier.
- `title`: Scholar display title.
- `authors`: Scholar display authors, improved with a verified full author list where available.
- `venue`: verified publication venue or Scholar display venue.
- `year`: publication year or `null` when Scholar provides none.
- `type`: `journal`, `conference`, `abstract`, `preprint`, `chapter`, `thesis`, `poster`, or `other`.
- `url`: DOI or strongest stable public source.
- `scholarUrl`: direct Scholar detail link.
- `doi`: normalized DOI where available.
- `pillars`: zero or more RVI research-pillar IDs, using `other` when reliable classification is not possible.
- `summary`: concise description only when supported by the abstract or paper.
- `metadataStatus`: `verified` or `review`.
- `verifiedWith`: list of Scholar, DOI, ORCID, UT Pure, or publisher sources used.
- `image`: local image path or research-pillar fallback.
- `imageAlt`: meaningful alternative text.
- `imageSource`: paper and figure source URL.
- `imageCredit`: figure number or graphical-abstract label.
- `imageLicense`: confirmed reuse license or `unverified`.
- `featuredVisual`: true only for a 2022-or-later journal paper with a locally stored, reusable image.

## Visual Publication Layout

The selected layout is a visual chronological list.

- The page defaults to all 70 records in Scholar publication-date order.
- Journal papers from 2022 onward use a horizontal card with a fixed-ratio image beside the metadata.
- Older journal papers and non-journal outputs use a compact text-first row.
- Mobile layouts stack image above metadata without changing the order.
- Missing or broken images fall back to a labelled research-pillar visual.
- A thumbnail is always attached to its corresponding publication, not placed in a separate gallery.

The page includes three filters:

- Year.
- Type.
- Research pillar.

Filter results update an accessible result count and provide an explicit empty state.

## Image Selection and Licensing

For each journal paper published in 2022 or later, use this priority:

1. Publisher-provided graphical abstract.
2. System or method overview figure.
3. Representative Figure 1 or a core experimental/application figure.
4. RVI research-pillar fallback visual.

An original paper image is copied into `assets/img/publications/` only when the article or image has a clearly reusable licence, such as CC BY. The image is stored locally rather than hot-linked.

Each published image records its source URL, figure label, and licence. When reuse permission is unclear, including many IEEE, Springer, or Elsevier pages, the site uses a professional placeholder until Kenan provides an author-owned image or confirms permission.

## Synchronization Workflow

A local script, `scripts/update-publications.js`, will transform a saved Scholar snapshot into the normalized website dataset.

The workflow is:

1. Capture the Scholar list with `pagesize=100` and publication-date sorting.
2. Store the source snapshot under a non-public maintenance-data directory.
3. Deduplicate by Scholar citation ID and normalized title.
4. Enrich records from DOI, ORCID, UT Pure, and publisher metadata.
5. Preserve unresolved records with a review flag.
6. Generate `assets/data/publications-data.js` deterministically.
7. Maintain image metadata separately from generated bibliographic fields so regeneration cannot erase curated image decisions.

Runtime website visitors never trigger Scholar or publisher requests.

## Failure Handling

- Scholar access failure leaves the last verified snapshot intact.
- Missing metadata leaves the record visible with a review label.
- Duplicate records fail validation instead of silently dropping entries.
- Missing image files render a pillar-specific fallback.
- Unverified licences never produce copied publisher images.
- A generated record count other than the expected snapshot count fails validation until the source difference is reviewed.

## Verification

Automated checks will verify:

- Exactly 70 Scholar records for the initial snapshot.
- Unique `id` and `scholarId` values.
- Valid year, type, URL, pillar, and metadata-status fields.
- Image source and licence fields for every locally copied paper figure.
- Year, type, and pillar filter behavior.
- Featured visual eligibility only for licensed 2022-or-later journal papers.
- Deterministic publication generation.
- Missing-image fallback behavior.

Browser verification will cover desktop and mobile layouts, all filter combinations, result counts, image loading, fallback rendering, console errors, horizontal overflow, and text overlap.

## Deferred Items

- Images for papers whose reuse licence cannot be confirmed.
- Author-provided visual replacements.
- Manual resolution of Scholar entries with incomplete year, venue, or type.
- Future Scholar additions after the 11 July 2026 snapshot.
