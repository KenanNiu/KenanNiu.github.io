const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

test("Scholar baseline contains exactly 70 unique records", () => {
  const snapshot = JSON.parse(fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8"));
  assert.equal(snapshot.expectedCount, 70);
  assert.equal(snapshot.records.length, 70);
  assert.equal(new Set(snapshot.records.map((item) => item.scholarId)).size, 70);
});

test("normalizer preserves unresolved records without inventing fields", () => {
  const normalizerPath = "scripts/lib/publication-normalizer.js";
  assert.ok(fs.existsSync(normalizerPath), "publication normalizer module must exist");

  const { normalizeRecord } = require(`../${normalizerPath}`);
  const result = normalizeRecord({ scholarId: "x", title: "Paper", authorsDisplay: "K Niu", venueDisplay: "", year: null }, {});

  assert.equal(result.type, "other");
  assert.equal(result.metadataStatus, "review");
  assert.equal(result.year, null);
});

test("curation retains existing confirmed public metadata", () => {
  const curation = JSON.parse(fs.readFileSync("maintenance/publications/curation.json", "utf8"));
  const scholarId = "mWEOPuMAAAAJ:70eg2SAEIzsC";
  const { normalizeRecord } = require("../scripts/lib/publication-normalizer");
  const source = JSON.parse(fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8")).records
    .find((record) => record.scholarId === scholarId);
  const result = normalizeRecord(source, curation);

  assert.equal(result.id, "semg-motion-2026");
  assert.equal(result.type, "journal");
  assert.equal(result.doi, "10.1109/TBME.2026.3686312");
  assert.deepEqual(result.pillars, ["learning-reasoning", "motion-intelligence"]);
  assert.equal(result.metadataStatus, "verified");
});

test("generator writes the normalized 70-record Scholar order", () => {
  const generatorPath = "scripts/generate-publications.js";
  assert.ok(fs.existsSync(generatorPath), "publication generator script must exist");

  const generate = spawnSync(process.execPath, [generatorPath], { encoding: "utf8" });
  assert.equal(generate.status, 0, generate.stderr);
  const check = spawnSync(process.execPath, [generatorPath, "--check"], { encoding: "utf8" });
  assert.equal(check.status, 0, check.stderr);

  const context = { window: {} };
  require("node:vm").runInNewContext(fs.readFileSync("assets/data/publications-data.js", "utf8"), context);
  assert.equal(context.window.rviPublications.length, 70);
  assert.deepEqual(
    Array.from(context.window.rviPublications, (record) => record.scholarId),
    JSON.parse(fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8")).records.map((record) => record.scholarId)
  );
});

test("generator check rejects an edited generated dataset", () => {
  const outputPath = "assets/data/publications-data.js";
  const original = fs.readFileSync(outputPath, "utf8");

  try {
    fs.writeFileSync(outputPath, "window.rviPublications = [];\n");
    const check = spawnSync(process.execPath, ["scripts/generate-publications.js", "--check"], { encoding: "utf8" });
    assert.notEqual(check.status, 0);
  } finally {
    fs.writeFileSync(outputPath, original);
  }
});
