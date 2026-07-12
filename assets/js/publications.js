(function () {
  const filters = document.getElementById("publication-filters");
  const list = document.getElementById("publication-list");
  const publications = window.rviPublications || [];
  if (!filters || !list) return;
  filters.className = "filter-bar";
  filters.innerHTML = `<label>Year<select id="year-filter"><option value="all">All years</option></select></label><label>Type<select id="type-filter"><option value="all">All types</option><option value="journal">Journal</option><option value="conference">Conference</option><option value="abstract">Abstract</option><option value="preprint">Preprint</option><option value="chapter">Book chapter</option><option value="thesis">Thesis</option><option value="poster">Poster</option><option value="other">Other</option></select></label><label>Research pillar<select id="pillar-filter"><option value="all">All pillars</option><option value="vision-imaging">Vision &amp; Imaging</option><option value="learning-reasoning">Learning &amp; Reasoning</option><option value="spatial-intelligence">Spatial Intelligence</option><option value="motion-intelligence">Motion Intelligence</option></select></label><span id="result-count" aria-live="polite"></span>`;
  const yearFilter = document.getElementById("year-filter");
  const typeFilter = document.getElementById("type-filter");
  const pillarFilter = document.getElementById("pillar-filter");
  const count = document.getElementById("result-count");
  Array.from(new Set(publications.map(function (item) { return item.year; }).filter(Boolean))).sort(function (a, b) { return b - a; }).forEach(function (year) {
    const option = document.createElement("option"); option.value = String(year); option.textContent = String(year); yearFilter.appendChild(option);
  });
  function render() {
    const visible = window.RVIPublications.filter(publications, { year: yearFilter.value, type: typeFilter.value, pillar: pillarFilter.value });
    list.textContent = "";
    count.textContent = `${visible.length} publication${visible.length === 1 ? "" : "s"}`;
    if (!visible.length) { list.innerHTML = `<p class="empty-state">No selected publications match these filters.</p>`; return; }
    visible.forEach(function (publication) {
      const article = document.createElement("article");
      article.className = "publication-item";
      const tags = publication.pillars.map(function (pillar) { return `<span>${pillar.replaceAll("-", " ")}</span>`; }).join("");
      const status = publication.metadataStatus === "verified" ? "Verified metadata" : "Metadata review";
      article.innerHTML = `<div class="publication-year">${publication.year || "—"}</div><div><div class="tag-row">${tags}</div><p class="publication-type">${publication.type}</p><h2><a href="${publication.url}" target="_blank" rel="noopener noreferrer">${publication.title}</a></h2><p>${publication.authors}</p><p>${publication.venue || "Venue under review"}</p>${publication.summary ? `<p class="publication-summary">${publication.summary}</p>` : ""}<span class="status">${status}</span></div>`;
      list.appendChild(article);
    });
  }
  yearFilter.addEventListener("change", render); typeFilter.addEventListener("change", render); pillarFilter.addEventListener("change", render); render();
})();
