const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const childProcess = require("node:child_process");

function loadCore() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/js/slideshow-core.js", "utf8"), context);
  return context.window.RVISlideshow;
}

test("slideshow wraps in both directions", () => {
  const core = loadCore();
  assert.equal(core.nextIndex(5, 6), 0);
  assert.equal(core.previousIndex(0, 6), 5);
});

test("autoplay stops for reduced motion, hover, or focus", () => {
  const core = loadCore();
  assert.equal(core.shouldAutoplay({ reducedMotion: true, hovered: false, focused: false }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: true, focused: false }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: false, focused: true }), false);
  assert.equal(core.shouldAutoplay({ reducedMotion: false, hovered: false, focused: false }), true);
});

test("generated manifest matches sorted slide folder", () => {
  childProcess.execFileSync("node", ["scripts/update-hero-slides.js", "--check"]);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("assets/data/hero-slides.js", "utf8"), context);
  assert.deepEqual(Array.from(context.window.rviHeroSlides, (slide) => slide.src), [
    "assets/img/hero-slides/slide-a.svg",
    "assets/img/hero-slides/slide-b.svg",
    "assets/img/hero-slides/slide-c.svg",
    "assets/img/hero-slides/slide-d.svg",
    "assets/img/hero-slides/slide-e.svg",
    "assets/img/hero-slides/slide-f.svg"
  ]);
});
