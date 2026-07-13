const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

test("weekly workflow creates reviewed publication pull requests only for changes", () => {
  const workflow = fs.readFileSync(".github/workflows/update-publications.yml", "utf8");
  assert.match(workflow, /cron:\s*['"]0 7 \* \* 1['"]/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /contents:\s*write/);
  assert.match(workflow, /pull-requests:\s*write/);
  assert.match(workflow, /node-version:\s*22/);
  assert.match(workflow, /pub\.orcid\.org\/v3\.0/);
  assert.match(workflow, /node --test tests\/\*\.test\.js/);
  assert.match(workflow, /git diff --quiet/);
  assert.match(workflow, /automated\/publication-update-/);
  assert.match(workflow, /gh pr create/);
  assert.match(workflow, /concurrency:/);
});

test("report writer renders all review sections", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "publication-report-"));
  const input = path.join(directory, "report.json");
  const output = path.join(directory, "report.md");
  fs.writeFileSync(input, JSON.stringify({
    newRecords: [{ title: "New work" }], changedFields: [{ title: "Changed work" }],
    reviewRequired: [{ reason: "check" }], missingFromSources: ["scholar:1"],
    imageRequired: [{ title: "Needs image" }], sourceFailures: [{ source: "ORCID" }]
  }));
  const result = spawnSync(process.execPath, ["scripts/write-publication-report.js", input, output], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const markdown = fs.readFileSync(output, "utf8");
  ["Added", "Changed", "Review required", "Missing from sources", "Image required", "Source failures"].forEach((heading) => assert.match(markdown, new RegExp(`## ${heading}`)));
});
