(function () {
  const container = document.getElementById("research-list");
  if (!container || !window.rviResearch) return;
  container.textContent = "";
  const publicationMap = new Map((window.rviPublications || []).map(function (item) { return [item.id, item]; }));
  window.rviResearch.forEach(function (pillar) {
    const publications = pillar.representativePublicationIds.map(function (id) { return publicationMap.get(id); }).filter(Boolean);
    const section = document.createElement("article");
    section.id = pillar.id;
    section.className = `research-pillar accent-${pillar.accent}`;
    section.dataset.research = pillar.id;
    const publicationItems = publications.map(function (publication) {
      const tags = (publication.pillars || []).map(function (id) {
        const direction = window.rviResearch.find(function (item) { return item.id === id; });
        return direction ? `<a class="research-tag" data-research="${id}" href="#${id}">${direction.title}</a>` : "";
      }).join("");
      return `<li><a href="${publication.url}" target="_blank" rel="noopener noreferrer">${publication.title}</a><span>${publication.year} · ${publication.venue}</span>${tags ? `<div class="research-tags" aria-label="Research directions">${tags}</div>` : ""}</li>`;
    }).join("");
    section.innerHTML = `<header><span>${pillar.number}</span><div><h2>${pillar.title}</h2></div></header><div class="research-body"><p>${pillar.summary}</p><p class="research-question">${pillar.question}</p></div><div class="research-evidence"><div><h3>Selected publications</h3><ul>${publicationItems}</ul></div><div><h3>Research outlook</h3><p>${pillar.next}</p></div></div>`;
    container.appendChild(section);
  });
  const portfolio = document.getElementById("research-systems");
  if (portfolio && window.rviCreateResearchFeature) {
    portfolio.textContent = "";
    (window.rviProjects || []).forEach(function (project) {
      portfolio.appendChild(window.rviCreateResearchFeature(project));
    });
  }
})();
