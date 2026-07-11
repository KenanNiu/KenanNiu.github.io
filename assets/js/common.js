(function () {
  function createElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function externalLink(item, className) {
    const link = createElement("a", className || "text-link", item.label || item.title || item.url);
    link.href = item.url;
    if (/^https?:/.test(item.url)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  }

  function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      nav.classList.toggle("is-open", willOpen);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.matches("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  window.RVI = { createElement: createElement, externalLink: externalLink };
  setupNavigation();
})();
