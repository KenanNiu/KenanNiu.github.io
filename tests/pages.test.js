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
