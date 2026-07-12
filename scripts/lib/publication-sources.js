const { normalizeTitle } = require("./publication-normalizer");

function normalizeDoi(value) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//, "")
    .replace(/^doi:\s*/, "");
  return /^10\.\d{1,9}\/.+/.test(normalized) ? normalized : null;
}

function matchCandidate(existing, candidate) {
  const doi = normalizeDoi(candidate.doi);
  if (doi) {
    const doiMatch = existing.find((record) => normalizeDoi(record.doi) === doi);
    if (doiMatch) return doiMatch;
  }

  if (candidate.pureId) {
    const pureMatch = existing.find((record) => record.pureId === candidate.pureId);
    if (pureMatch) return pureMatch;
  }

  const title = normalizeTitle(candidate.title);
  return title ? existing.find((record) => normalizeTitle(record.title) === title) || null : null;
}

function externalId(group, type) {
  const ids = group && group["external-ids"] && group["external-ids"]["external-id"];
  const match = Array.isArray(ids) ? ids.find((item) => item["external-id-type"] === type) : null;
  return match ? match["external-id-value"] : null;
}

function parseOrcidWorks(payload) {
  const groups = payload && Array.isArray(payload.group) ? payload.group : [];
  return groups.map((group) => {
    const summaries = Array.isArray(group["work-summary"]) ? group["work-summary"] : [];
    const pure = summaries.find((summary) => /Pure Portal/.test(summary.source?.["source-name"]?.value || ""));
    const preferred = pure || summaries[0] || {};
    return {
      source: "orcid",
      title: preferred.title?.title?.value || "",
      doi: normalizeDoi(externalId(group, "doi")),
      pureId: externalId(group, "source-work-id"),
      type: preferred.type || null,
      year: Number.parseInt(preferred["publication-date"]?.year?.value, 10) || null,
      url: preferred.url?.value || null
    };
  }).filter((candidate) => candidate.title);
}

function mergeCandidates(existing, candidates) {
  const records = existing.map((record) => ({ ...record }));
  const report = {
    newRecords: [],
    changedFields: [],
    reviewRequired: [],
    missingFromSources: [],
    imageRequired: [],
    sourceFailures: []
  };
  const matched = new Set();

  candidates.forEach((candidate) => {
    const match = matchCandidate(records, candidate);
    if (!match) {
      report.newRecords.push(candidate);
      report.reviewRequired.push({ reason: "unmatched-source-record", candidate });
      return;
    }
    matched.add(match.scholarId);
  });

  report.missingFromSources = records
    .filter((record) => record.scholarId && !matched.has(record.scholarId))
    .map((record) => record.scholarId);
  return { records, report };
}

module.exports = { matchCandidate, mergeCandidates, normalizeDoi, parseOrcidWorks };
