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

test("all values disable their respective filters", () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/js/publication-filter.js", "utf8"), context);
  const items = [{ year: 2026, pillars: ["motion-intelligence"] }];
  assert.equal(context.window.RVIPublications.filter(items, { year: "all", pillar: "all" }).length, 1);
});
