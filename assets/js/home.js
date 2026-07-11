(function () {
  const core = window.RVISlideshow;
  const slides = window.rviHeroSlides || [];
  const container = document.getElementById("hero-slideshow");
  let current = 0;
  let timer = null;
  let hovered = false;
  let focused = false;
  let touchStart = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderSlideshow() {
    if (!container || !slides.length) return;
    container.textContent = "";
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    const controls = document.createElement("div");
    const previous = document.createElement("button");
    const next = document.createElement("button");
    const dots = document.createElement("div");
    figure.className = "slide-figure";
    image.className = "slide-image";
    image.addEventListener("error", function () { figure.classList.add("image-missing"); image.hidden = true; });
    caption.className = "slide-caption";
    controls.className = "slide-controls";
    previous.type = "button";
    previous.className = "slide-arrow";
    previous.setAttribute("aria-label", "Previous image");
    previous.textContent = "Prev";
    next.type = "button";
    next.className = "slide-arrow";
    next.setAttribute("aria-label", "Next image");
    next.textContent = "Next";
    dots.className = "slide-dots";
    dots.setAttribute("aria-label", "Choose research image");
    controls.append(previous, dots, next);
    figure.append(image, caption, controls);
    container.appendChild(figure);

    function show(index) {
      current = index;
      const slide = slides[current];
      figure.classList.remove("image-missing");
      image.hidden = false;
      image.src = slide.src;
      image.alt = slide.alt;
      caption.innerHTML = `<span>${slide.pillar}</span><strong>${slide.title}</strong><small>${slide.caption}</small>`;
      dots.querySelectorAll("button").forEach((dot, dotIndex) => dot.setAttribute("aria-current", String(dotIndex === current)));
    }

    slides.forEach(function (slide, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slide-dot";
      dot.setAttribute("aria-label", `Show ${slide.title}`);
      dot.addEventListener("click", function () { show(index); restart(); });
      dots.appendChild(dot);
    });

    function restart() {
      if (timer) window.clearInterval(timer);
      timer = null;
      if (core.shouldAutoplay({ reducedMotion: reducedMotion, hovered: hovered, focused: focused })) {
        timer = window.setInterval(function () { show(core.nextIndex(current, slides.length)); }, 5000);
      }
    }

    previous.addEventListener("click", function () { show(core.previousIndex(current, slides.length)); restart(); });
    next.addEventListener("click", function () { show(core.nextIndex(current, slides.length)); restart(); });
    container.addEventListener("mouseenter", function () { hovered = true; restart(); });
    container.addEventListener("mouseleave", function () { hovered = false; restart(); });
    container.addEventListener("focusin", function () { focused = true; restart(); });
    container.addEventListener("focusout", function () { focused = false; restart(); });
    container.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") previous.click();
      if (event.key === "ArrowRight") next.click();
    });
    container.addEventListener("touchstart", function (event) { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    container.addEventListener("touchend", function (event) {
      if (touchStart === null) return;
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 45) (distance > 0 ? previous : next).click();
      touchStart = null;
    }, { passive: true });
    show(0);
    restart();
  }

  function renderPillars() {
    const container = document.getElementById("home-pillars");
    if (!container || !window.rviResearch) return;
    container.textContent = "";
    window.rviResearch.forEach(function (pillar) {
      const article = document.createElement("article");
      article.className = `pillar-card accent-${pillar.accent}`;
      article.innerHTML = `<span>${pillar.number}</span><h3>${pillar.title}</h3><p>${pillar.claim}</p><a href="research.html#${pillar.id}">Explore pillar</a>`;
      container.appendChild(article);
    });
  }

  function renderEvidence() {
    const container = document.getElementById("home-evidence");
    if (!container || !window.rviPublications) return;
    container.textContent = "";
    window.rviPublications.slice(0, 3).forEach(function (publication) {
      const article = document.createElement("article");
      article.className = "evidence-card";
      article.innerHTML = `<span>${publication.year} · ${publication.venue}</span><h3>${publication.title}</h3><p>${publication.summary}</p><a href="${publication.url}" target="_blank" rel="noopener noreferrer">View publication</a>`;
      container.appendChild(article);
    });
  }

  renderSlideshow();
  renderPillars();
  renderEvidence();
})();
