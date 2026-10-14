(function () {
  const media = document.getElementById("hero-slideshow");
  const heroProject = (window.rviProjects || []).find(function (project) { return project.homeHero; });
  if (media && heroProject && window.rviCreateResearchFeature) {
    media.textContent = "";
    media.appendChild(window.rviCreateResearchFeature(heroProject, true).querySelector("figure"));
    const image = media.querySelector("img");
    image.loading = "eager";
    image.fetchPriority = "high";
  }
  const pillars = document.getElementById("home-pillars");
  if (pillars && window.rviResearch) {
    pillars.textContent = "";
    window.rviResearch.forEach(function (pillar) {
      const article = document.createElement("article");
      article.className = `pillar-card accent-${pillar.accent}`;
      article.dataset.research = pillar.id;
      article.innerHTML = `<span>${pillar.number}</span><h3>${pillar.title}</h3><p>${pillar.summary}</p><a href="research.html#${pillar.id}">Research details</a>`;
      pillars.appendChild(article);
    });
  }
  const evidence = document.getElementById("home-evidence");
  if (evidence && window.rviProjects && window.rviCreateResearchFeature) {
    evidence.textContent = "";
    window.rviProjects.filter(function (project) { return project.home; }).slice(0, 3).forEach(function (project) {
      evidence.appendChild(window.rviCreateResearchFeature(project, true));
    });
  }
})();
