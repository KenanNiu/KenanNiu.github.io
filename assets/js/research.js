(function () {
  const container = document.getElementById("research-list");
  if (!container || !window.rviResearch) return;
  container.textContent = "";
  const media = document.createElement("div");
  media.className = "research-media-overview";
  media.innerHTML = '<figure class="focus-diagram"><a href="simple/images/research-directions.png"><img src="simple/images/research-directions.png" width="1280" height="856" alt="Image-guided navigation, robotic vision and imaging, motion tracking, and AR/VR/MR."></a><figcaption>Four connected research directions</figcaption></figure><div class="research-gallery"><figure><a href="simple/images/imaging-motion-research.png"><img src="simple/images/imaging-motion-research.png" width="825" height="930" loading="lazy" alt="Medical imaging, ultrasound motion tracking and musculoskeletal modelling."></a><figcaption>Imaging &amp; motion analysis</figcaption></figure><figure><a href="simple/images/reconstruction-navigation-research.png"><img src="simple/images/reconstruction-navigation-research.png" width="961" height="872" loading="lazy" alt="Anatomical visualisation, shape modelling, image-guided navigation and robotic ultrasound."></a><figcaption>3D reconstruction &amp; navigation</figcaption></figure></div>';
  container.appendChild(media);
  window.rviResearch.forEach(function (pillar) {
    const publicationMap = new Map((window.rviPublications || []).map(function (item) { return [item.id, item]; }));
    const publications = pillar.representativePublicationIds.map(function (id) { return publicationMap.get(id); }).filter(Boolean);
    const section = document.createElement("article");
    section.id = pillar.id;
    section.className = `research-pillar accent-${pillar.accent}`;
    const publicationItems = publications.map(function (publication) {
      return `<li><a href="${publication.url}" target="_blank" rel="noopener noreferrer">${publication.title}</a><span>${publication.year} · ${publication.venue}</span></li>`;
    }).join("");
    section.innerHTML = `<header><span>${pillar.number}</span><div><h2>${pillar.title}</h2></div></header><div class="research-body"><p>${pillar.summary}</p><p class="research-question">${pillar.question}</p></div><div class="research-evidence"><div><h3>Selected publications</h3><ul>${publicationItems}</ul></div><div><h3>Research outlook</h3><p>${pillar.next}</p></div></div>`;
    container.appendChild(section);
  });
})();
