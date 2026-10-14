(function () {
  window.rviCreateResearchFeature = function (project, compact) {
    const article = document.createElement("article");
    article.id = project.id;
    article.className = "research-feature";
    if (project.image) {
      const figure = document.createElement("figure");
      figure.className = "research-feature-media";
      const link = document.createElement("a");
      link.href = project.image.src;
      link.setAttribute("aria-label", "View full-size image: " + project.title);
      const image = document.createElement("img");
      image.src = project.image.src;
      image.alt = project.image.alt;
      image.width = project.image.width;
      image.height = project.image.height;
      image.loading = "lazy";
      image.decoding = "async";
      link.appendChild(image);
      figure.appendChild(link);
      const caption = document.createElement("figcaption");
      caption.textContent = project.image.caption;
      figure.appendChild(caption);
      article.appendChild(figure);
    }
    const copy = document.createElement("div");
    copy.className = "research-feature-copy";
    const status = document.createElement("p");
    status.className = "eyebrow";
    status.textContent = project.status;
    const title = document.createElement(compact ? "h3" : "h2");
    title.textContent = project.title;
    const summary = document.createElement("p");
    summary.textContent = project.summary;
    copy.append(status, title, summary);
    if (!compact && project.detail) {
      const detail = document.createElement("p");
      detail.textContent = project.detail;
      copy.appendChild(detail);
    }
    if (project.url) {
      const link = document.createElement("a");
      link.href = project.url;
      link.textContent = project.linkLabel || "Related publication";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      copy.appendChild(link);
    }
    if (compact) {
      const link = document.createElement("a");
      link.href = "projects.html#" + project.id;
      link.textContent = "System details";
      const links = document.createElement("div");
      links.className = "action-row";
      links.appendChild(link);
      copy.appendChild(links);
    }
    article.appendChild(copy);
    return article;
  };

  const container = document.getElementById("project-list");
  if (!container || !window.rviProjects) return;
  container.textContent = "";
  container.className = "research-portfolio";
  window.rviProjects.forEach(function (project) {
    container.appendChild(window.rviCreateResearchFeature(project));
  });
})();
