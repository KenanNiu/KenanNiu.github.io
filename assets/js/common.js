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
    const header = toggle.closest(".site-header");
    const mobile = window.matchMedia("(max-width: 1040px)");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    }
    if (header) header.classList.add("nav-ready");
    setOpen(false);
    toggle.addEventListener("click", function () {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(willOpen);
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    document.addEventListener("focusin", function (event) {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    mobile.addEventListener("change", function () {
      const focusWasInNav = nav.contains(document.activeElement);
      setOpen(false);
      if (mobile.matches && focusWasInNav) toggle.focus();
    });
  }

  window.RVI = { createElement: createElement, externalLink: externalLink };
  setupNavigation();
})();
