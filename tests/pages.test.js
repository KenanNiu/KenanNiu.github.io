const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const pages = [
  "index.html",
  "research.html",
  "publications.html",
  "people.html",
  "projects.html",
  "education.html",
  "about.html"
];

test("all pages expose shared navigation and accessible landmarks", () => {
  pages.forEach((page) => {
    const html = fs.readFileSync(page, "utf8");
    assert.match(html, /class="skip-link"/);
    assert.match(html, /data-site-nav/);
    assert.match(html, /<main/);
    assert.match(html, /class="site-footer"/);
    assert.match(html, /assets\/js\/common\.js/);
  });
});

test("each page marks exactly one active navigation destination", () => {
  pages.forEach((page) => {
    const html = fs.readFileSync(page, "utf8");
    assert.equal((html.match(/aria-current="page"/g) || []).length, 1, page);
  });
});

test("pages have unique metadata and no obsolete personal-site visual", () => {
  const titles = new Set();
  pages.forEach((page) => {
    const html = fs.readFileSync(page, "utf8");
    const title = html.match(/<title>([^<]+)<\/title>/);
    assert.ok(title, page);
    assert.ok(!titles.has(title[1]), title[1]);
    titles.add(title[1]);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.doesNotMatch(html, /research-visual\.png|Kenan Niu \| Robotics, Imaging/);
  });
});

test("visual system includes manifesto, evidence, responsive, and reduced-motion rules", () => {
  const css = fs.readFileSync("assets/css/styles.css", "utf8");
  assert.match(css, /\.manifesto/);
  assert.match(css, /\.research-pillar/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /@media \(max-width: 760px\)/);
});

test("homepage remains compatible with the academic static-site checker", () => {
  const html = fs.readFileSync("index.html", "utf8");
  const data = fs.readFileSync("assets/data/site-data.js", "utf8");
  ["research", "education", "publications", "supervision", "demos", "contact"].forEach((id) => {
    assert.match(html, new RegExp(`id="${id}"`));
  });
  assert.match(html, /assets\/js\/main\.js/);
  assert.match(data, /window\.siteData/);
});

test("publication archive has visual and compact layouts with image fallback", () => {
  const renderer = fs.readFileSync("assets/js/publications.js", "utf8");
  const css = fs.readFileSync("assets/css/styles.css", "utf8");
  assert.match(renderer, /publication-item \$\{isVisual \? "visual" : "compact"\}/);
  assert.match(renderer, /publication-thumbnail/);
  assert.match(renderer, /data-fallback/);
  assert.match(renderer, /uses-fallback/);
  assert.match(css, /aspect-ratio:\s*3\s*\/\s*2/);
});
