const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadPublications() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/data/publications-data.js", "utf8"), context);
  return context.window.rviPublications;
}

test("copied paper images have source, credit, and reusable licence", () => {
  const manifest = JSON.parse(fs.readFileSync("maintenance/publications/image-sources.json", "utf8"));
  manifest.forEach((source) => {
    assert.match(source.sourceUrl, /^https:\/\//);
    assert.ok(["CC BY 4.0", "CC BY 3.0", "CC BY-SA 4.0", "CC0", "Public domain"].includes(source.license));
    assert.ok(source.credit);
    assert.ok(fs.existsSync(source.localPath));
  });
});

test("every journal paper from 2022 onward has a local image or fallback", () => {
  const recentJournals = loadPublications().filter((item) => item.type === "journal" && item.year >= 2022);
  assert.ok(recentJournals.length > 0);
  recentJournals.forEach((item) => {
    const image = item.image || item.fallbackImage;
    assert.ok(image, item.title);
    assert.ok(fs.existsSync(image), image);
  });
});

test("all six RVI fallback assets exist", () => {
  ["vision-imaging", "learning-reasoning", "spatial-intelligence", "motion-intelligence", "digital-twins", "other"].forEach((name) => {
    assert.ok(fs.existsSync(`assets/img/publication-fallbacks/${name}.svg`));
  });
});
