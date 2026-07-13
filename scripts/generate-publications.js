#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
  containsReplacementCharacter,
  normalizeRecord,
  serializePublications,
  validateScholarSnapshot
} = require("./lib/publication-normalizer");

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

function getOutputPath() {
  const index = process.argv.indexOf("--output");
  if (index === -1) return outputPath;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error("--output requires a file path.");
  return path.resolve(process.cwd(), value);
}

function buildOutput() {
  const snapshot = readJson(snapshotPath);
  const curation = readJson(curationPath);
  validateScholarSnapshot(snapshot);
  if (containsReplacementCharacter(curation)) throw new Error("Publication curation contains U+FFFD corruption.");

  ensureUnique(snapshot.records, "scholarId");
  const records = snapshot.records.map((record) => normalizeRecord(record, curation, { root }));
  ensureUnique(records, "id");
  ensureUnique(records, "scholarId");
  return serializePublications(records);
}

function main() {
  const output = buildOutput();
  const checkOnly = process.argv.includes("--check");
  const targetPath = getOutputPath();
  const current = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, "utf8") : "";

  if (checkOnly) {
    if (current !== output) {
      process.stderr.write("Generated publication data differs from assets/data/publications-data.js.\n");
      process.exitCode = 1;
    }
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, output);
}

if (require.main === module) main();

module.exports = { buildOutput, getOutputPath };
