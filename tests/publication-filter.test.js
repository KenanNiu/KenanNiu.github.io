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
  const items = [{ year: 2026, type: "journal", pillars: ["motion-intelligence"] }];
  assert.equal(context.window.RVIPublications.filter(items, { year: "all", type: "all", pillar: "all" }).length, 1);
});

test("filters by year, type, and pillar together", () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/js/publication-filter.js", "utf8"), context);
  const items = [
    { scholarId: "journal-motion", year: 2025, type: "journal", pillars: ["motion-intelligence"] },
    { scholarId: "conference-motion", year: 2025, type: "conference", pillars: ["motion-intelligence"] },
    { scholarId: "journal-vision", year: 2025, type: "journal", pillars: ["vision-imaging"] }
  ];
  const result = context.window.RVIPublications.filter(items, {
    year: "2025", type: "journal", pillar: "motion-intelligence"
  });
  assert.deepEqual(Array.from(result, (item) => item.scholarId), ["journal-motion"]);
});
