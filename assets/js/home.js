(function () {
  const media = document.getElementById("hero-slideshow");
  if (media) {
    media.className = "home-research-diagram";
    media.innerHTML = '<figure><a href="simple/images/research-directions.png"><img src="simple/images/research-directions.png" width="1280" height="856" alt="Four connected research directions: image-guided navigation, robotic vision and imaging, motion tracking, and AR/VR/MR."></a><figcaption>Four connected research directions</figcaption></figure>';
  }
  const pillars = document.getElementById("home-pillars");
  if (pillars && window.rviResearch) {
    pillars.textContent = "";
    window.rviResearch.forEach(function (pillar) {
      const article = document.createElement("article");
      article.className = `pillar-card accent-${pillar.accent}`;
      article.innerHTML = `<span>${pillar.number}</span><h3>${pillar.title}</h3><p>${pillar.summary}</p><a href="research.html#${pillar.id}">Research details</a>`;
      pillars.appendChild(article);
    });
  }
  const evidence = document.getElementById("home-evidence");
  if (evidence && window.rviPublications) {
    evidence.textContent = "";
    window.rviPublications.filter(function (publication) { return publication.summary; }).slice(0, 3).forEach(function (publication) {
      const article = document.createElement("article");
      article.className = "evidence-card";
      article.innerHTML = `<span>${publication.venue}</span><h3>${publication.title}</h3><p>${publication.summary}</p><a href="${publication.url}" target="_blank" rel="noopener noreferrer">View publication</a>`;
      evidence.appendChild(article);
    });
  }
})();
