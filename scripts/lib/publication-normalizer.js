const PUBLICATION_TYPES = new Set([
  "journal",
  "conference",
  "abstract",
  "preprint",
  "chapter",
  "thesis",
  "poster",
  "other"
]);

const PILLARS = new Set([
  "vision-imaging",
  "learning-reasoning",
  "spatial-intelligence",
  "motion-intelligence"
]);

function cleanText(value) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function normalizeTitle(value) {
  return cleanText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function hash(value) {
  let result = 2166136261;
  for (const character of value) {
    result ^= character.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return (result >>> 0).toString(36);
}

function createSlug(title, scholarId) {
  const titleSlug = normalizeTitle(title).replace(/\s+/g, "-") || "publication";
  return `${titleSlug}-${hash(scholarId || titleSlug)}`;
}

function expandScholarUrl(value, scholarId) {
  if (typeof value === "string" && /^https:\/\//.test(value)) return value;
  if (typeof value === "string" && value.startsWith("/")) return `https://scholar.google.com${value}`;
  return `https://scholar.google.com/citations?view_op=view_citation&user=mWEOPuMAAAAJ&citation_for_view=${encodeURIComponent(scholarId)}`;
}

function validYear(value) {
  return Number.isInteger(value) && value >= 1000 && value <= 9999 ? value : null;
}

function validUrl(value) {
  return typeof value === "string" && /^https:\/\//.test(value) ? value : null;
}

function curatedRecord(curation, scholarId) {
  return curation && typeof curation === "object" && curation[scholarId] && typeof curation[scholarId] === "object"
    ? curation[scholarId]
    : {};
}

function normalizeRecord(source, curation) {
  const curated = curatedRecord(curation, source.scholarId);
  const scholarUrl = expandScholarUrl(source.scholarUrl, source.scholarId);
  const type = PUBLICATION_TYPES.has(curated.type) ? curated.type : "other";
  const year = validYear(curated.year) ?? validYear(source.year);
  const pillars = Array.isArray(curated.pillars) && curated.pillars.every((pillar) => PILLARS.has(pillar))
    ? curated.pillars
    : [];
  const metadataStatus = curated.metadataStatus === "verified" ? "verified" : "review";
  const imageLicense = cleanText(curated.imageLicense) || "unverified";
  const image = cleanText(curated.image) || null;

  return {
    id: cleanText(curated.id) || createSlug(source.title, source.scholarId),
    scholarId: source.scholarId,
    title: cleanText(source.title),
    authors: cleanText(curated.authors) || cleanText(source.authorsDisplay),
    venue: cleanText(curated.venue) || cleanText(source.venueDisplay),
    year,
    type,
    url: validUrl(curated.url) || scholarUrl,
    scholarUrl,
    doi: cleanText(curated.doi) || null,
    pillars,
    summary: cleanText(curated.summary) || null,
    metadataStatus,
    verifiedWith: Array.isArray(curated.verifiedWith) && curated.verifiedWith.length
      ? curated.verifiedWith.filter(validUrl)
      : [scholarUrl],
    image,
    imageAlt: cleanText(curated.imageAlt) || null,
    imageSource: validUrl(curated.imageSource),
    imageCredit: cleanText(curated.imageCredit) || null,
    imageLicense,
    featuredVisual: Boolean(curated.featuredVisual && type === "journal" && year && year >= 2022 && image && imageLicense !== "unverified"),
    evidence: curated.evidence === "frontier" ? "frontier" : "published"
  };
}

function serializePublications(records) {
  return `window.rviPublications = ${JSON.stringify(records, null, 2)};\n`;
}

module.exports = {
  PUBLICATION_TYPES,
  PILLARS,
  createSlug,
  expandScholarUrl,
  normalizeRecord,
  normalizeTitle,
  serializePublications
};
