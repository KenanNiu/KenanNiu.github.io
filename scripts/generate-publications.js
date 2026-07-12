#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { normalizeRecord, serializePublications } = require("./lib/publication-normalizer");

const root = path.resolve(__dirname, "..");
const snapshotPath = path.join(root, "maintenance/publications/scholar-2026-07-11.json");
const curationPath = path.join(root, "maintenance/publications/curation.json");
const outputPath = path.join(root, "assets/data/publications-data.js");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureUnique(records, field) {
  const values = records.map((record) => record[field]);
  if (values.some((value) => !value) || new Set(values).size !== values.length) {
    throw new Error(`Publication ${field} values must be present and unique.`);
  }
}

function buildOutput() {
  const snapshot = readJson(snapshotPath);
  const curation = readJson(curationPath);

  if (!Number.isInteger(snapshot.expectedCount) || snapshot.records.length !== snapshot.expectedCount) {
    throw new Error("Scholar snapshot count does not match expectedCount.");
  }

  ensureUnique(snapshot.records, "scholarId");
  const records = snapshot.records.map((record) => normalizeRecord(record, curation));
  ensureUnique(records, "id");
  ensureUnique(records, "scholarId");
  return serializePublications(records);
}

function main() {
  const output = buildOutput();
  const checkOnly = process.argv.includes("--check");
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";

  if (checkOnly) {
    if (current !== output) {
      process.stderr.write("Generated publication data differs from assets/data/publications-data.js.\n");
      process.exitCode = 1;
    }
    return;
  }

  fs.writeFileSync(outputPath, output);
}

main();
