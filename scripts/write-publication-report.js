#!/usr/bin/env node

const fs = require("node:fs");

const sections = [
  ["Added", "newRecords"],
  ["Changed", "changedFields"],
  ["Review required", "reviewRequired"],
  ["Missing from sources", "missingFromSources"],
  ["Image required", "imageRequired"],
  ["Source failures", "sourceFailures"]
];

function label(item) {
  if (typeof item === "string") return item;
  return item.title || item.scholarId || item.reason || item.source || JSON.stringify(item);
}

function render(report) {
  const body = sections.map(([heading, key]) => {
    const items = Array.isArray(report[key]) ? report[key] : [];
    return `## ${heading}\n\n${items.length ? items.map((item) => `- ${label(item)}`).join("\n") : "- None"}`;
  }).join("\n\n");
  return `# Publication update report\n\n${body}\n`;
}

function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) throw new Error("Usage: write-publication-report.js REPORT.json REPORT.md");
  fs.writeFileSync(output, render(JSON.parse(fs.readFileSync(input, "utf8"))));
}

if (require.main === module) main();
module.exports = { render };
