const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const slideDirectory = path.join(root, "assets", "img", "hero-slides");
const manifestPath = path.join(root, "assets", "data", "hero-slides.js");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);

const files = fs.readdirSync(slideDirectory)
  .filter((file) => supported.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

const slides = files.map((file, index) => {
  const letterMatch = file.match(/slide-([a-z])/i);
  const label = letterMatch ? letterMatch[1].toUpperCase() : String(index + 1);
  return {
    src: `assets/img/hero-slides/${file}`,
    alt: `RVI Group research image placeholder ${label}`,
    title: `Research image ${label}`,
    caption: "Replace this placeholder with an approved laboratory, robot, imaging or publication visual.",
    pillar: "RVI Group"
  };
});

const output = `window.rviHeroSlides = ${JSON.stringify(slides, null, 2)};\n`;

if (process.argv.includes("--check")) {
  const current = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, "utf8") : "";
  if (current !== output) {
    process.stderr.write("Hero slide manifest is out of date. Run: node scripts/update-hero-slides.js\n");
    process.exit(1);
  }
} else {
  fs.writeFileSync(manifestPath, output);
  process.stdout.write(`Updated ${path.relative(root, manifestPath)} with ${slides.length} slides.\n`);
}
