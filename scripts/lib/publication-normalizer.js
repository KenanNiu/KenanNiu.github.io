const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

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

const SCHOLAR_PROFILE_URL = "https://scholar.google.com/citations?hl=en&user=mWEOPuMAAAAJ&view_op=list_works&sortby=pubdate&pagesize=100";
const SCHOLAR_SORT = "pubdate";
const SCHOLAR_ID_SEQUENCE_SHA256 = "742a3a9363f31b9acbd6ddff079dd5126e60e6ba871191f5339e1fe32f7382d1";
const REUSABLE_IMAGE_LICENSES = new Set([
  "CC0",
  "CC BY",
  "CC BY 4.0",
  "CC BY-SA",
  "CC BY-SA 4.0",
  "Public domain"
]);

const SCHOLAR_SNAPSHOT_FIELDS = [
  "capturedAt",
  "profileUrl",
  "sort",
  "expectedCount",
  "scholarIdSequence",
  "scholarIdSequenceSha256",
  "records"
];
const SCHOLAR_RECORD_FIELDS = [
  "scholarId",
  "scholarUrl",
  "title",
  "authorsDisplay",
  "venueDisplay",
  "year",
  "citedBy"
];

function cleanText(value) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function containsReplacementCharacter(value) {
  if (typeof value === "string") return value.includes("\uFFFD");
  if (Array.isArray(value)) return value.some(containsReplacementCharacter);
  if (value && typeof value === "object") return Object.values(value).some(containsReplacementCharacter);
  return false;
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
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname ? value : null;
  } catch {
    return null;
  }
}

function hashScholarIdSequence(ids) {
  return crypto.createHash("sha256").update(ids.join("\n"), "utf8").digest("hex");
}

function hasExactFields(value, expectedFields) {
  const actualFields = Object.keys(value).sort();
  return actualFields.length === expectedFields.length
    && actualFields.every((field, index) => field === [...expectedFields].sort()[index]);
}

function validateScholarUrl(value, scholarId) {
  const url = validUrl(value);
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.hostname === "scholar.google.com"
      && parsed.pathname === "/citations"
      && parsed.searchParams.get("view_op") === "view_citation"
      && parsed.searchParams.get("user") === "mWEOPuMAAAAJ"
      && parsed.searchParams.get("citation_for_view") === scholarId;
  } catch {
    return false;
  }
}

function validateScholarSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) {
    throw new Error("Scholar snapshot must be an object.");
  }
  if (!hasExactFields(snapshot, SCHOLAR_SNAPSHOT_FIELDS)) throw new Error("Scholar snapshot fields are invalid.");
  if (containsReplacementCharacter(snapshot)) throw new Error("Scholar snapshot contains U+FFFD corruption.");
  if (snapshot.capturedAt !== "2026-07-11") throw new Error("Scholar snapshot capturedAt is invalid.");
  if (snapshot.profileUrl !== SCHOLAR_PROFILE_URL) throw new Error("Scholar snapshot profileUrl is invalid.");
  if (snapshot.sort !== SCHOLAR_SORT) throw new Error("Scholar snapshot sort is invalid.");
  if (snapshot.expectedCount !== 70 || !Array.isArray(snapshot.records) || snapshot.records.length !== 70) {
    throw new Error("Scholar snapshot record count is invalid.");
  }
  if (!Array.isArray(snapshot.scholarIdSequence) || snapshot.scholarIdSequence.length !== 70) {
    throw new Error("Scholar snapshot Scholar-ID sequence is invalid.");
  }
  if (new Set(snapshot.scholarIdSequence).size !== 70) throw new Error("Scholar snapshot Scholar-ID sequence is not unique.");
  if (snapshot.scholarIdSequenceSha256 !== SCHOLAR_ID_SEQUENCE_SHA256
    || hashScholarIdSequence(snapshot.scholarIdSequence) !== SCHOLAR_ID_SEQUENCE_SHA256) {
    throw new Error("Scholar snapshot Scholar-ID checksum is invalid.");
  }

  snapshot.records.forEach((record, index) => {
    if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error(`Scholar snapshot record ${index + 1} shape is invalid.`);
    if (!hasExactFields(record, SCHOLAR_RECORD_FIELDS)) throw new Error(`Scholar snapshot record ${index + 1} fields are invalid.`);
    if (typeof record.scholarId !== "string" || !/^[^:]+:[A-Za-z0-9_-]+$/.test(record.scholarId)) {
      throw new Error(`Scholar snapshot record ${index + 1} Scholar ID is invalid.`);
    }
    if (record.scholarId !== snapshot.scholarIdSequence[index]) throw new Error(`Scholar snapshot record ${index + 1} is out of order.`);
    if (!validateScholarUrl(record.scholarUrl, record.scholarId)) throw new Error(`Scholar snapshot record ${index + 1} URL does not match its Scholar ID.`);
    if (typeof record.title !== "string" || !cleanText(record.title)) throw new Error(`Scholar snapshot record ${index + 1} title is invalid.`);
    if (typeof record.authorsDisplay !== "string" || typeof record.venueDisplay !== "string") {
      throw new Error(`Scholar snapshot record ${index + 1} text fields are invalid.`);
    }
    if (record.year !== null && !validYear(record.year)) throw new Error(`Scholar snapshot record ${index + 1} year is invalid.`);
    if (!Number.isInteger(record.citedBy) || record.citedBy < 0) throw new Error(`Scholar snapshot record ${index + 1} citation count is invalid.`);
  });
  return snapshot;
}

function isLocalImage(value, root = process.cwd()) {
  const relativePath = cleanText(value);
  if (!relativePath || path.isAbsolute(relativePath) || relativePath.includes("..")) return false;
  if (!relativePath.startsWith("assets/img/publications/")) return false;

  const imageRoot = path.resolve(root, "assets/img/publications");
  const imagePath = path.resolve(root, relativePath);
  if (!imagePath.startsWith(`${imageRoot}${path.sep}`)) return false;
  try {
    return fs.statSync(imagePath).isFile();
  } catch {
    return false;
  }
}

function curatedRecord(curation, scholarId) {
  return curation && typeof curation === "object" && curation[scholarId] && typeof curation[scholarId] === "object"
    ? curation[scholarId]
    : {};
}

function normalizeRecord(source, curation, options = {}) {
  const curated = curatedRecord(curation, source.scholarId);
  const scholarUrl = expandScholarUrl(source.scholarUrl, source.scholarId);
  const type = PUBLICATION_TYPES.has(curated.type) ? curated.type : "other";
  const year = validYear(curated.year) ?? validYear(source.year);
  const pillars = Array.isArray(curated.pillars) && curated.pillars.every((pillar) => PILLARS.has(pillar))
    ? curated.pillars
    : [];
  const verifiedWith = Array.isArray(curated.verifiedWith)
    ? curated.verifiedWith.filter(validUrl)
    : [scholarUrl];
  const metadataStatus = curated.metadataStatus === "verified" && verifiedWith.length ? "verified" : "review";
  const imageLicense = cleanText(curated.imageLicense) || "unverified";
  const image = isLocalImage(curated.image, options.root) ? cleanText(curated.image) : null;
  const imageSource = validUrl(curated.imageSource);
  const imageCredit = cleanText(curated.imageCredit) || null;
  const fallbackName = pillars[0] || "other";
  const fallbackImage = `assets/img/publication-fallbacks/${fallbackName}.svg`;
  const featuredVisual = Boolean(
    curated.featuredVisual
      && type === "journal"
      && year
      && year >= 2022
      && image
      && REUSABLE_IMAGE_LICENSES.has(imageLicense)
      && imageSource
      && imageCredit
  );

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
    verifiedWith,
    image,
    fallbackImage,
    imageAlt: cleanText(curated.imageAlt) || null,
    imageSource,
    imageCredit,
    imageLicense,
    featuredVisual,
    evidence: curated.evidence === "frontier"
      ? "frontier"
      : metadataStatus === "verified"
        ? "published"
        : "review"
  };
}

function serializePublications(records) {
  return `window.rviPublications = ${JSON.stringify(records, null, 2)};\n`;
}

module.exports = {
  PUBLICATION_TYPES,
  PILLARS,
  REUSABLE_IMAGE_LICENSES,
  SCHOLAR_ID_SEQUENCE_SHA256,
  SCHOLAR_PROFILE_URL,
  SCHOLAR_SORT,
  containsReplacementCharacter,
  createSlug,
  expandScholarUrl,
  hashScholarIdSequence,
  isLocalImage,
  normalizeRecord,
  normalizeTitle,
  serializePublications,
  validateScholarSnapshot
};
