const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const records = JSON.parse(fs.readFileSync(path.join(root, "assets/data/awards.json"), "utf8"));
const escape = value => String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const outcomes = { winner: "Winner", "runner-up": "Runner-up", finalist: "Finalist", "honorable-mention": "Honorable Mention" };
const ids = new Set();
records.forEach(record => {
  for (const field of ["id", "event", "award", "category", "paper", "authors"]) {
    if (typeof record[field] !== "string" || !record[field].trim()) throw new Error(`Missing award ${field}`);
  }
  if (ids.has(record.id) || !/^[a-z0-9-]+$/.test(record.id)) throw new Error("Award IDs must be unique slugs");
  ids.add(record.id);
  if (!Number.isInteger(record.year) || record.year < 1900 || record.year > 9999) throw new Error("Invalid award year");
  if (!Object.hasOwn(outcomes, record.outcome) || record.label !== outcomes[record.outcome]) throw new Error("Invalid award outcome or label");
  for (const field of ["doi", "source", ...(record.announcement ? ["announcement"] : [])]) {
    if (new URL(record[field]).protocol !== "https:") throw new Error("Award links must use HTTPS");
  }
});
const link = (url, label) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
const rows = records.slice().sort((a, b) => b.year - a.year).map(record => `
  <li id="${escape(record.id)}" class="award-entry" data-outcome="${escape(record.outcome)}">
    <div class="award-event"><time datetime="${record.year}">${record.year}</time><span>${escape(record.event)}</span></div>
    <div class="award-distinction"><span class="award-outcome">${escape(record.label)}</span><p>${escape(record.award)}</p><small>${escape(record.category)}</small></div>
    <div class="award-work"><h3>${escape(record.paper)}</h3><p class="award-authors">${escape(record.authors)}</p>${record.note ? `<p class="award-note">${escape(record.note)}</p>` : ""}<div class="text-links">${link(record.doi, "Paper / DOI")}${link(record.source, "Award source")}${record.announcement ? link(record.announcement, "Ceremony announcement") : ""}</div></div>
  </li>`).join("\n");
// Reuse the homepage shell so generated navigation stays aligned with the site.
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const header = home.match(/<header class="site-header">[\s\S]*?<\/header>/)[0]
  .replace(' aria-current="page"', "")
  .replace('href="awards.html"', 'href="awards.html" aria-current="page"');
const footer = home.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];
const output = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Awards and recognition for research co-authored by Kenan Niu: conference awards, finalists and journal honorable mentions."><title>Awards &amp; Recognition | RVI Group</title><link rel="stylesheet" href="assets/css/styles.css?v=20261023-awards-page"></head>
<body><a class="skip-link" href="#main">Skip to content</a>${header}
<main id="main"><header class="page-hero"><p class="eyebrow">RVI Group</p><h1>Awards &amp; Recognition</h1></header>
<section id="awards" class="section" aria-label="Research awards and recognition"><ul class="awards-list">${rows}
</ul></section></main>
${footer}<script src="assets/js/common.js"></script></body></html>
`;
const target = path.join(root, "awards.html");
if (process.argv.includes("--check")) {
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== output) {
    throw new Error("Awards page is stale. Run node scripts/generate-awards.js");
  }
} else fs.writeFileSync(target, output);
