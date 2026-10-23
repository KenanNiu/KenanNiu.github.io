(function () {
  const container = document.getElementById("hero-slideshow");
  const core = window.RVISlideshow;
  if (!container || !core || !window.rviCreateResearchFeature) return;
  const seen = new Set();
  const projects = (window.rviProjects || []).filter(function (project) {
    if (!project.image || seen.has(project.image.src)) return false;
    seen.add(project.image.src);
    return true;
  });
  projects.sort(function (a, b) { return Number(!!b.homeHero) - Number(!!a.homeHero); });
  if (!projects.length) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = { reducedMotion: motion.matches, paused: false, hovered: false, focused: false, hidden: document.hidden };
  let index = 0;
  let timer;
  container.textContent = "";
  container.classList.add("hero-carousel");
  container.setAttribute("role", "region");
  container.setAttribute("aria-roledescription", "carousel");
  container.setAttribute("aria-label", "Research highlights");
  const stage = document.createElement("div");
  stage.className = "hero-carousel-stage";
  const slides = projects.map(function (project, position) {
    const figure = window.rviCreateResearchFeature(project, true).querySelector("figure");
    figure.classList.add("hero-carousel-slide");
    figure.setAttribute("role", "group");
    figure.setAttribute("aria-label", (position + 1) + " of " + projects.length + ": " + project.title);
    const image = figure.querySelector("img");
    image.loading = "eager";
    image.fetchPriority = position === 0 ? "high" : "low";
    stage.appendChild(figure);
    return figure;
  });
  const controls = document.createElement("div");
  controls.className = "hero-carousel-controls";
  function button(label, symbol, action) {
    const control = document.createElement("button");
    control.type = "button";
    control.title = label;
    control.setAttribute("aria-label", label);
    control.textContent = symbol;
    control.addEventListener("click", action);
    return control;
  }
  const count = document.createElement("span");
  count.className = "hero-carousel-count";
  const toggle = button("Pause slideshow", "\u23f8", function () {
    if (state.reducedMotion) {
      state.reducedMotion = false;
      state.paused = false;
    } else state.paused = !state.paused;
    schedule();
  });
  function show(next) {
    index = next;
    slides.forEach(function (slide, position) {
      const active = position === index;
      slide.classList.toggle("is-active", active);
      slide.inert = !active;
      slide.setAttribute("aria-hidden", String(!active));
    });
    count.textContent = (index + 1) + " / " + slides.length;
  }
  function schedule() {
    clearInterval(timer);
    const stopped = state.paused || state.reducedMotion;
    const label = stopped ? "Play slideshow" : "Pause slideshow";
    toggle.textContent = stopped ? "\u25b6" : "\u23f8";
    toggle.title = label;
    toggle.setAttribute("aria-label", label);
    if (slides.length > 1 && core.shouldAutoplay(state)) {
      timer = setInterval(function () { show(core.nextIndex(index, slides.length)); }, 3000);
    }
  }
  controls.append(
    button("Previous image", "\u2190", function () { show(core.previousIndex(index, slides.length)); schedule(); }),
    toggle,
    button("Next image", "\u2192", function () { show(core.nextIndex(index, slides.length)); schedule(); }),
    count
  );
  container.append(stage, controls);
  container.addEventListener("mouseenter", function () { state.hovered = true; schedule(); });
  container.addEventListener("mouseleave", function () { state.hovered = false; schedule(); });
  container.addEventListener("focusin", function () { state.focused = true; schedule(); });
  container.addEventListener("focusout", function (event) {
    state.focused = container.contains(event.relatedTarget);
    schedule();
  });
  document.addEventListener("visibilitychange", function () { state.hidden = document.hidden; schedule(); });
  motion.addEventListener("change", function () { state.reducedMotion = motion.matches; schedule(); });
  show(0);
  schedule();
})();
