const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const REVIEWED_SCHOLAR_IDS = [
  "mWEOPuMAAAAJ:70eg2SAEIzsC", "mWEOPuMAAAAJ:vV6vV6tmYwMC", "mWEOPuMAAAAJ:lSLTfruPkqcC",
  "mWEOPuMAAAAJ:ns9cj8rnVeAC", "mWEOPuMAAAAJ:RYcK_YlVTxYC", "mWEOPuMAAAAJ:RGFaLdJalmkC",
  "mWEOPuMAAAAJ:TFP_iSt0sucC", "mWEOPuMAAAAJ:O3NaXMp0MMsC", "mWEOPuMAAAAJ:blknAaTinKkC",
  "mWEOPuMAAAAJ:GnPB-g6toBAC", "mWEOPuMAAAAJ:BqipwSGYUEgC", "mWEOPuMAAAAJ:JV2RwH3_ST0C",
  "mWEOPuMAAAAJ:iH-uZ7U-co4C", "mWEOPuMAAAAJ:j3f4tGmQtD8C", "mWEOPuMAAAAJ:k_IJM867U9cC",
  "mWEOPuMAAAAJ:4JMBOYKVnBMC", "mWEOPuMAAAAJ:r0BpntZqJG4C", "mWEOPuMAAAAJ:RHpTSmoSYBkC",
  "mWEOPuMAAAAJ:J_g5lzvAfSwC", "mWEOPuMAAAAJ:maZDTaKrznsC", "mWEOPuMAAAAJ:e5wmG9Sq2KIC",
  "mWEOPuMAAAAJ:M3NEmzRMIkIC", "mWEOPuMAAAAJ:isC4tDSrTZIC", "mWEOPuMAAAAJ:_Qo2XoVZTnwC",
  "mWEOPuMAAAAJ:HDshCWvjkbEC", "mWEOPuMAAAAJ:qUcmZB5y_30C", "mWEOPuMAAAAJ:mB3voiENLucC",
  "mWEOPuMAAAAJ:hFOr9nPyWt4C", "mWEOPuMAAAAJ:35N4QoGY0k4C", "mWEOPuMAAAAJ:TQgYirikUcIC",
  "mWEOPuMAAAAJ:ZeXyd9-uunAC", "mWEOPuMAAAAJ:IWHjjKOFINEC", "mWEOPuMAAAAJ:7PzlFSSx8tAC",
  "mWEOPuMAAAAJ:QIV2ME_5wuYC", "mWEOPuMAAAAJ:mVmsd5A6BfQC", "mWEOPuMAAAAJ:4DMP91E08xMC",
  "mWEOPuMAAAAJ:L8Ckcad2t8MC", "mWEOPuMAAAAJ:qxL8FJ1GzNcC", "mWEOPuMAAAAJ:9ZlFYXVOiuMC",
  "mWEOPuMAAAAJ:Wp0gIr-vW9MC", "mWEOPuMAAAAJ:4TOpqqG69KYC", "mWEOPuMAAAAJ:_kc_bZDykSQC",
  "mWEOPuMAAAAJ:3fE2CSJIrl8C", "mWEOPuMAAAAJ:KlAtU1dfN6UC", "mWEOPuMAAAAJ:8k81kl-MbHgC",
  "mWEOPuMAAAAJ:MXK_kJrjxJIC", "mWEOPuMAAAAJ:Zph67rFs4hoC", "mWEOPuMAAAAJ:Se3iqnhoufwC",
  "mWEOPuMAAAAJ:kNdYIx-mwKoC", "mWEOPuMAAAAJ:5nxA0vEk-isC", "mWEOPuMAAAAJ:YFjsv_pBGBYC",
  "mWEOPuMAAAAJ:0EnyYjriUFMC", "mWEOPuMAAAAJ:UebtZRa9Y70C", "mWEOPuMAAAAJ:WF5omc3nYNoC",
  "mWEOPuMAAAAJ:W7OEmFMy1HYC", "mWEOPuMAAAAJ:YsMSGLbcyi4C", "mWEOPuMAAAAJ:Tyk-4Ss8FVUC",
  "mWEOPuMAAAAJ:Y0pCki6q_DkC", "mWEOPuMAAAAJ:UeHWp8X0CEIC", "mWEOPuMAAAAJ:qjMakFHDy7sC",
  "mWEOPuMAAAAJ:d1gkVwhDpl0C", "mWEOPuMAAAAJ:9yKSN-GCB0IC", "mWEOPuMAAAAJ:LkGwnXOMwfcC",
  "mWEOPuMAAAAJ:YOwf2qJgpHMC", "mWEOPuMAAAAJ:ufrVoPGSRksC", "mWEOPuMAAAAJ:_FxGoFyzp5QC",
  "mWEOPuMAAAAJ:hMod-77fHWUC", "mWEOPuMAAAAJ:bEWYMUwI8FkC", "mWEOPuMAAAAJ:dhFuZR0502QC",
  "mWEOPuMAAAAJ:eQOLeE2rZwMC"
];

const REVIEWED_SCHOLAR_ID_SHA256 = "742a3a9363f31b9acbd6ddff079dd5126e60e6ba871191f5339e1fe32f7382d1";

function readSnapshot() {
  return JSON.parse(fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8"));
}

test("Scholar baseline contains exactly 70 unique records", () => {
  const snapshot = readSnapshot();
  assert.equal(snapshot.expectedCount, 70);
  assert.equal(snapshot.records.length, 70);
  assert.equal(new Set(snapshot.records.map((item) => item.scholarId)).size, 70);
});

test("Scholar baseline pins the independently reviewed order and checksum", () => {
  const snapshot = readSnapshot();
  const ids = snapshot.records.map((record) => record.scholarId);
  assert.deepEqual(snapshot.scholarIdSequence, REVIEWED_SCHOLAR_IDS);
  assert.deepEqual(ids, REVIEWED_SCHOLAR_IDS);
  assert.equal(snapshot.scholarIdSequenceSha256, REVIEWED_SCHOLAR_ID_SHA256);
  assert.equal(crypto.createHash("sha256").update(ids.join("\n"), "utf8").digest("hex"), REVIEWED_SCHOLAR_ID_SHA256);
  assert.equal(snapshot.profileUrl, "https://scholar.google.com/citations?hl=en&user=mWEOPuMAAAAJ&view_op=list_works&sortby=pubdate&pagesize=100");
  assert.equal(snapshot.sort, "pubdate");
});

test("Scholar snapshot and generated output reject replacement-character corruption", () => {
  const snapshotText = fs.readFileSync("maintenance/publications/scholar-2026-07-11.json", "utf8");
  const generatedText = fs.readFileSync("assets/data/publications-data.js", "utf8");
  assert.doesNotMatch(snapshotText, /\uFFFD/);
  assert.doesNotMatch(generatedText, /\uFFFD/);
});

test("snapshot validation rejects malformed records and source URLs", () => {
  const { validateScholarSnapshot } = require("../scripts/lib/publication-normalizer");
  const cases = [
    (snapshot) => { snapshot.records[0].title = 42; },
    (snapshot) => { snapshot.records[0].scholarUrl = snapshot.records[0].scholarUrl.replace(/citation_for_view=[^&]+/, "citation_for_view=wrong"); },
    (snapshot) => { snapshot.profileUrl = "https://example.com/profile"; },
    (snapshot) => { snapshot.sort = "citedby"; },
    (snapshot) => { snapshot.records[0].venueDisplay = "bad\uFFFDtext"; }
  ];
  cases.forEach((mutate) => {
    const snapshot = structuredClone(readSnapshot());
    mutate(snapshot);
    assert.throws(() => validateScholarSnapshot(snapshot), /Scholar snapshot/);
  });
});

test("normalizer preserves unresolved records without inventing fields", () => {
  const normalizerPath = "scripts/lib/publication-normalizer.js";
  assert.ok(fs.existsSync(normalizerPath), "publication normalizer module must exist");

  const { normalizeRecord } = require(`../${normalizerPath}`);
  const result = normalizeRecord({ scholarId: "x", title: "Paper", authorsDisplay: "K Niu", venueDisplay: "", year: null }, {});

  assert.equal(result.type, "other");
  assert.equal(result.metadataStatus, "review");
  assert.equal(result.year, null);
  assert.equal(result.evidence, "review");
});

test("verified metadata requires a valid verification URL", () => {
  const { normalizeRecord } = require("../scripts/lib/publication-normalizer");
  const result = normalizeRecord({ scholarId: "x", title: "Paper", authorsDisplay: "K Niu", venueDisplay: "Venue", year: 2025 }, {
    x: { metadataStatus: "verified", verifiedWith: ["not-a-url"] }
  });
  assert.equal(result.metadataStatus, "review");
  assert.deepEqual(result.verifiedWith, []);
});

test("featured visuals require a reusable local image, source URL, and credit", () => {
  const { normalizeRecord } = require("../scripts/lib/publication-normalizer");
  const source = { scholarId: "x", title: "Paper", authorsDisplay: "K Niu", venueDisplay: "Venue", year: 2025 };
  const eligible = normalizeRecord(source, {
    x: {
      type: "journal", image: "assets/img/publications/paper.png", imageLicense: "CC BY 4.0",
      imageSource: "https://doi.org/10.1234/example", imageCredit: "Figure 1", featuredVisual: true
    }
  });
  assert.equal(eligible.featuredVisual, true);

  const missingCredit = normalizeRecord(source, {
    x: {
      type: "journal", image: "assets/img/publications/paper.png", imageLicense: "CC BY 4.0",
      imageSource: "https://doi.org/10.1234/example", featuredVisual: true
    }
  });
  assert.equal(missingCredit.featuredVisual, false);

  const unlicensed = normalizeRecord(source, {
    x: {
      type: "journal", image: "assets/img/publications/paper.png", imageLicense: "all rights reserved",
      imageSource: "https://doi.org/10.1234/example", imageCredit: "Figure 1", featuredVisual: true
    }
  });
  assert.equal(unlicensed.featuredVisual, false);
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
  assert.equal(result.evidence, "published");
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

test("generator check rejects an edited temporary output without normalizing it", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "publication-generation-"));
  const outputPath = path.join(tempDir, "publications-data.js");
  const generate = spawnSync(process.execPath, ["scripts/generate-publications.js", "--output", outputPath], { encoding: "utf8" });
  assert.equal(generate.status, 0, generate.stderr);
  fs.writeFileSync(outputPath, "window.rviPublications = [];\n");
  const check = spawnSync(process.execPath, ["scripts/generate-publications.js", "--check", "--output", outputPath], { encoding: "utf8" });
  assert.notEqual(check.status, 0);
  assert.equal(fs.readFileSync(outputPath, "utf8"), "window.rviPublications = [];\n");
});
