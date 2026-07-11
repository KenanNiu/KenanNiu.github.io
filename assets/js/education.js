(function () {
  const container = document.getElementById("education-content");
  const education = window.rviSite && window.rviSite.education;
  if (!container || !education) return;
  container.innerHTML = `<div class="education-grid"><section><p class="eyebrow">Affiliated programmes</p><h2>Robotics and Technical Medicine</h2><ul>${education.programs.map(function (item) { return `<li>${item}</li>`; }).join("")}</ul></section><section><p class="eyebrow">Current teaching</p><h2>Courses and projects</h2><ul class="course-list">${education.courses.map(function (item) { return `<li>${item}</li>`; }).join("")}</ul></section></div><section class="supervision-note"><p class="eyebrow">Student research</p><h2>From thesis question to public evidence.</h2><p>RVI Group supervises BSc, MSc, internship and doctoral work. Individual student outputs will be published only after privacy, authorship and public-release review.</p><a class="button primary" href="mailto:k.niu@utwente.nl">Discuss a research project</a></section>`;
})();
