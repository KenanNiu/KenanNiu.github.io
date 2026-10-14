# Simple static website

Public URL: https://kenanniu.github.io/simple/

The original website remains at the root URL, unchanged. The simple page contains research directions, selected outcomes, all 70 records in the reviewed July 2026 Scholar order, and contact links. Publications use one continuous list without year-group headings; confirmed DOI identifiers are shown along with article and Scholar links. It has no runtime content loading, animation, slideshow, framework, or external assets. Three supplied images are used: one focus diagram and two research montages, each linked to its full-resolution file.

The Research section uses the supplied four-direction diagram at `simple/images/research-directions.png`. Replace this file to update the image without changing the layout. Edit research copy in `scripts/build-simple-site.js`. Publication records come from the existing generated publication dataset. Run `node scripts/build-simple-site.js` after updating it; commit `simple/index.html` too. Run with `--check` to detect stale output.

The automatic publication workflow is disabled on GitHub and its source is archived at `maintenance/disabled-workflows/update-publications.yml`. Publication updates are manual. GitHub Pages deployment remains active.

Audit: the October 12 update fetched sources and passed tests, then failed because GitHub Actions was not permitted to create pull requests. The former workflow updated source caches only; it did not add reviewed records to the public bibliography. The simple site makes the archive capture date explicit.

Verification: all 33 existing tests passed. Browser checks at 1440px and 390px, with JavaScript disabled, confirmed 70 publication entries, one loaded image, no horizontal overflow, and no page errors. The original seven HTML pages, CSS, JavaScript and publication dataset were not modified.
