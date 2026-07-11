(function () {
  const container = document.getElementById("project-list");
  if (!container || !window.rviProjects) return;
  container.textContent = "";
  window.rviProjects.forEach(function (project) {
    const article = document.createElement("article");
    article.className = "project-card";
    const link = project.url ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer">View evidence</a>` : "";
    article.innerHTML = `<div class="project-media">${project.type}</div><div><span class="status">${project.status}</span><h2>${project.title}</h2><p>${project.summary}</p>${link}</div>`;
    container.appendChild(article);
  });
})();
