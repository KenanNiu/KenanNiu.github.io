const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

const pages = [
  "index.html",
  "research.html",
  "publications.html",
  "awards.html",
  "people.html",
  "projects.html",
  "education.html",
  "about.html"
];

test("homepage introduces mission and vision before its five capabilities", () => {
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(html, /Towards human-inspired robotic intelligence/);
  assert.match(html, /id="mission-vision"/);
  assert.ok(html.indexOf('id="mission-vision"') < html.indexOf('id="research"'));
  ["Our mission", "Our vision", "Human motion intelligence", "Decision-making intelligence", "Neuromorphic intelligence"].forEach(text => assert.ok(html.includes(text), text));
  assert.match(html, /long-term research/);
  assert.match(html, /hero-carousel\.js/);
  assert.match(html, /class="mission-artwork"/);
  assert.ok(fs.existsSync("assets/img/rvi-brand-concept.png"));
  assert.ok(fs.existsSync("assets/img/rvi-sensing-digital-twin-concept.png"));
  assert.equal((html.match(/class="mission-artwork"/g) || []).length, 2);
  assert.match(html, /AI-generated brand concept/);
});

test("dedicated awards page distinguishes four outcomes with paper and primary-source links", () => {
  const html = fs.readFileSync("awards.html", "utf8");
  assert.doesNotMatch(fs.readFileSync("index.html", "utf8"), /<section id="awards"/);
  const awards = html.match(/<section id="awards"[\s\S]*?<\/section>/);
  assert.ok(awards, "static awards section exists without JavaScript");
  const section = awards[0];
  assert.match(html, /Awards &amp; Recognition/);
  ["winner", "runner-up", "finalist", "honorable-mention"].forEach(status => {
    assert.equal((section.match(new RegExp(`data-outcome="${status}"`, "g")) || []).length, 1);
  });
  ["10.1109/BioRob60516.2024.10719969", "10.1109/ICAR58858.2023.10406449", "10.1109/ISMR48347.2022.9807524", "10.1109/LRA.2021.3061069"].forEach(doi => assert.ok(section.includes(`href="https://doi.org/${doi}"`)));
  assert.equal((section.match(/>Award source<\/a>/g) || []).length, 4);
  assert.match(section, /Journal recognition/);
  assert.match(section, /announced at ICRA 2022/);
});

test("every full website page links to Awards", () => {
  pages.forEach(page => assert.match(fs.readFileSync(page, "utf8"), /href="awards\.html"/));
  require("node:child_process").execFileSync(process.execPath, ["scripts/generate-awards.js", "--check"]);
});

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

test("full publication page has a static continuous bibliography", () => {
  const html = fs.readFileSync("publications.html", "utf8");
  assert.match(html, /class="publication-list"/);
  assert.equal((html.match(/>Article link<\/a>/g) || []).length, 70);
  assert.doesNotMatch(html, /publication-thumbnail|year-group|Publication records are loading|archive captured|Listed from/);
  assert.doesNotMatch(html, /src="assets\/js\/publications\.js"/);
});
