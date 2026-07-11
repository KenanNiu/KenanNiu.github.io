(function () {
  const container = document.getElementById("research-list");
  if (!container || !window.rviResearch) return;
  container.textContent = "";
  window.rviResearch.forEach(function (pillar) {
    const publicationMap = new Map((window.rviPublications || []).map(function (item) { return [item.id, item]; }));
    const publications = pillar.representativePublicationIds.map(function (id) { return publicationMap.get(id); }).filter(Boolean);
    const section = document.createElement("article");
    section.id = pillar.id;
    section.className = `research-pillar accent-${pillar.accent}`;
    const publicationItems = publications.map(function (publication) {
      return `<li><a href="${publication.url}" target="_blank" rel="noopener noreferrer">${publication.title}</a><span>${publication.year} · ${publication.venue}</span></li>`;
    }).join("");
    section.innerHTML = `<header><span>${pillar.number}</span><div><p class="eyebrow">${pillar.shortTitle}</p><h2>${pillar.title}</h2></div></header><div class="research-body"><div><h3>Core question</h3><p class="research-question">${pillar.question}</p><h3>Research position</h3><p>${pillar.claim}</p><p>${pillar.summary}</p></div><figure class="paper-figure-placeholder"><div>Open-access paper figure placeholder</div><figcaption>Source will be added after figure reuse is verified.</figcaption></figure></div><div class="research-evidence"><div><h3>Representative evidence</h3><ul>${publicationItems}</ul></div><div><h3>What we are pursuing next</h3><p>${pillar.next}</p><span class="status frontier">Research frontier</span></div></div>`;
    container.appendChild(section);
  });
})();
