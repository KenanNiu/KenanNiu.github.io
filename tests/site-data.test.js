const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function load(file) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context);
  return context.window;
}

test("defines four distinct research pillars", () => {
  const data = load("assets/data/research-data.js").rviResearch;
  assert.equal(data.length, 4);
  assert.deepEqual(Array.from(data, (item) => item.id), [
    "vision-imaging",
    "learning-reasoning",
    "spatial-intelligence",
    "motion-intelligence"
  ]);
});

test("all publications have evidence labels and valid pillar tags", () => {
  const publications = load("assets/data/publications-data.js").rviPublications;
  const types = new Set(["journal", "conference", "abstract", "preprint", "chapter", "thesis", "poster", "other"]);
  const allowed = new Set([
    "vision-imaging",
    "learning-reasoning",
    "spatial-intelligence",
    "motion-intelligence"
  ]);

  assert.equal(publications.length, 70);
  assert.equal(new Set(publications.map((publication) => publication.id)).size, 70);
  assert.equal(new Set(publications.map((publication) => publication.scholarId)).size, 70);
  publications.forEach((publication) => {
    assert.ok(["published", "frontier", "review"].includes(publication.evidence));
    assert.ok(types.has(publication.type));
    assert.ok(publication.pillars.every((pillar) => allowed.has(pillar)));
    assert.match(publication.url, /^https:\/\//);
    assert.match(publication.scholarUrl, /^https:\/\/scholar\.google\.com\/citations\?/);
  });
});

test("group data contains the confirmed team and privacy-preserving master's students without duplicates", () => {
  const site = load("assets/data/site-data.js").rviSite;
  const people = load("assets/data/people-data.js").rviPeople;
  assert.equal(site.name, "RVI Group");
  assert.equal(people.filter((person) => person.status === "confirmed").length, 18);
  assert.equal(people.filter((person) => person.group === "lead").length, 1);
  assert.equal(people.filter((person) => person.group === "postdoc").length, 2);
  assert.equal(people.filter((person) => person.group === "phd").length, 4);
  assert.equal(people.filter((person) => person.group === "master").length, 11);
  assert.equal(people.filter((person) => person.group === "alumni").length, 0);
  assert.equal(new Set(people.map(person => person.id)).size, 18);
  assert.equal(new Set(people.map(person => person.name.trim().toLowerCase())).size, 18);
  const masterProfiles = people.filter(person => person.group === "master").map(person => {
    const profile = person.links.find(link => link.label === "RAM profile");
    return new URL(profile.url).pathname.replace(/^\/index.php/, "").replace(/\/$/, "");
  });
  assert.equal(new Set(masterProfiles).size, 11);
  people.forEach(person => {
    assert.ok(fs.existsSync(person.image), person.image);
    if (person.group === "master") {
      assert.equal(person.image, "assets/img/people/student-avatar.svg");
      assert.equal(person.imageKind, "placeholder");
      assert.equal(person.imageSource, undefined);
      assert.equal(person.email, undefined);
      assert.ok(person.links.some(link => link.url.startsWith("https://www.ram.eemcs.utwente.nl/about-us/students/")));
    } else {
      assert.match(person.imageSource, /^https:\/\/www\.ram\.eemcs\.utwente\.nl\//);
      assert.ok(person.links.some(link => link.url.startsWith("https://www.ram.eemcs.utwente.nl/about-us/staff/")));
    }
  });
});
