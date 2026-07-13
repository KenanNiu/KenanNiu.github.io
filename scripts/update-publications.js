#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { mergeCandidates, parseCrossrefWorks, parseOrcidWorks } = require("./lib/publication-sources");
const { normalizeRecord, validateScholarSnapshot } = require("./lib/publication-normalizer");

const root = path.resolve(__dirname, "..");
const publicationRoot = path.join(root, "maintenance/publications");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function runOffline() {
  const snapshot = readJson(path.join(publicationRoot, "scholar-2026-07-11.json"));
  const curation = readJson(path.join(publicationRoot, "curation.json"));
  const orcid = readJson(path.join(publicationRoot, "source-cache/orcid-works.json"));
  const crossref = readJson(path.join(publicationRoot, "source-cache/crossref.json"));
  validateScholarSnapshot(snapshot);
  const existing = snapshot.records.map((record) => normalizeRecord(record, curation, { root }));
  return mergeCandidates(existing, [...parseOrcidWorks(orcid), ...parseCrossrefWorks(crossref)]);
}

function main() {
  if (!process.argv.includes("--offline")) {
    throw new Error("Live refresh is reserved for the scheduled workflow; use --offline with committed caches locally.");
  }
  const result = runOffline();
  process.stdout.write(`${JSON.stringify({ recordCount: result.records.length, ...result.report }, null, 2)}\n`);
}

if (require.main === module) main();

module.exports = { runOffline };
