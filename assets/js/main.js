(function () {
  const data = window.siteData;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function externalLink(item, className) {
    const link = el("a", className || "text-link", item.label || item.value);
    link.href = item.url;
    link.target = item.url && item.url.startsWith("http") ? "_blank" : "";
    link.rel = item.url && item.url.startsWith("http") ? "noopener noreferrer" : "";
    return link;
  }

  function renderLinks(containerId, links) {
    const container = document.getElementById(containerId);
    links.forEach((item) => container.appendChild(externalLink(item, "button-link")));
  }

  function renderCards(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach((item) => {
      const card = el("article", "info-card");
      card.appendChild(el("h3", "", item.title));
      card.appendChild(el("p", "", item.summary));
      container.appendChild(card);
    });
  }

  function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach((item) => {
      container.appendChild(el("li", "", item));
    });
  }

  function renderFacts() {
    const container = document.getElementById("quick-facts");
    data.profile.facts.forEach((item) => {
      const fact = el("div", "fact");
      fact.appendChild(el("span", "", item.label));
      fact.appendChild(el("strong", "", item.value));
      container.appendChild(fact);
    });
  }

  function renderPublications() {
    const container = document.getElementById("publication-list");
    data.publications.forEach((item) => {
      const article = el("article", "publication-item");
      article.appendChild(el("span", "publication-year", item.year));
      const body = el("div", "");
      body.appendChild(el("h3", "", item.title));
      body.appendChild(el("p", "", item.venue));
      article.appendChild(body);
      container.appendChild(article);
    });
  }

  function renderWorkflow() {
    const container = document.getElementById("supervision-workflow");
    data.supervisionWorkflow.forEach((item) => container.appendChild(el("li", "", item)));
  }

  function renderDemos() {
    const container = document.getElementById("demo-types");
    data.demoTypes.forEach((item) => {
      const card = el("article", "demo-card");
      card.appendChild(el("span", "status-pill", item.status));
      card.appendChild(el("h3", "", item.title));
      card.appendChild(el("p", "", item.summary));
      container.appendChild(card);
    });
  }

  function renderContact() {
    const container = document.getElementById("contact-card");
    data.profile.contact.forEach((item) => {
      const row = el("div", "contact-row");
      row.appendChild(el("span", "", item.label));
      if (item.url) {
        row.appendChild(externalLink(item, "text-link"));
      } else {
        row.appendChild(el("strong", "", item.value));
      }
      container.appendChild(row);
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  document.getElementById("profile-summary").textContent = data.profile.summary;
  document.getElementById("contact-summary").textContent = data.profile.contactSummary;
  document.getElementById("current-year").textContent = new Date().getFullYear();

  renderLinks("profile-links", data.profile.links);
  renderFacts();
  renderCards("research-themes", data.researchThemes);
  renderList("program-list", data.programs);
  renderList("course-list", data.courses);
  renderPublications();
  renderLinks("publication-links", data.publicationLinks);
  renderCards("supervision-categories", data.supervisionCategories);
  renderWorkflow();
  renderDemos();
  renderContact();
  setupNavigation();
})();
