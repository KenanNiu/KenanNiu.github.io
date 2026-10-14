(function () {
  const container = document.getElementById("people-list");
  if (!container || !window.rviPeople || !window.RVI) return;
  const create = window.RVI.createElement;
  container.textContent = "";
  (window.rviPeopleGroups || []).forEach(function (group) {
    const section = create("section", "people-section");
    section.id = group.id;
    const heading = create("h2", "people-section-heading", group.title);
    heading.id = group.id + "-heading";
    section.setAttribute("aria-labelledby", heading.id);
    section.appendChild(heading);
    const grid = create("div", "people-grid");
    window.rviPeople.filter(function (person) {
      return person.status === "confirmed" && person.group === group.id;
    }).forEach(function (person) {
      const article = create("article", "person-card");
      article.id = person.id;
      const image = create("img");
      image.src = person.image;
      image.alt = person.imageAlt || "Portrait of " + person.name;
      image.width = 500;
      image.height = 500;
      image.loading = "lazy";
      image.decoding = "async";
      article.appendChild(image);
      const copy = create("div", "person-copy");
      const identity = create("div", "person-identity");
      identity.appendChild(create("h3", "", person.name));
      if (person.group === "master") {
        (person.links || []).forEach(function (link) {
          identity.appendChild(window.RVI.externalLink(link));
        });
      }
      copy.appendChild(identity);
      copy.appendChild(create("p", "role", person.project ? person.project.type : person.role));
      if (person.project) {
        const project = create("p", "student-project-title");
        project.appendChild(window.RVI.externalLink({label: person.project.title, url: person.project.url}));
        copy.appendChild(project);
        const tags = create("ul", "student-research-tags");
        tags.setAttribute("aria-label", "Research directions");
        person.project.pillars.forEach(function (id) {
          const pillar = (window.rviResearch || []).find(function (item) { return item.id === id; });
          if (!pillar) return;
          const item = create("li");
          const link = create("a", "", pillar.title);
          link.href = "research.html#" + pillar.id;
          item.appendChild(link);
          tags.appendChild(item);
        });
        copy.appendChild(tags);
      }
      if (person.summary) copy.appendChild(create("p", "", person.summary));
      const links = create("div", "text-links");
      (person.group === "master" ? [] : person.links || []).forEach(function (link) {
        links.appendChild(window.RVI.externalLink(link));
      });
      if (person.email) links.appendChild(window.RVI.externalLink({ label: "Email", url: "mailto:" + person.email }));
      if (links.childNodes.length) copy.appendChild(links);
      article.appendChild(copy);
      grid.appendChild(article);
    });
    section.appendChild(grid);
    container.appendChild(section);
  });
  const credit = create("p", "people-source", "Staff information and photographs: ");
  credit.appendChild(window.RVI.externalLink({label: "Robotics and Mechatronics (RAM), University of Twente", url: "https://www.ram.eemcs.utwente.nl/about-us/staff"}));
  container.appendChild(credit);
  const studentsCredit = create("p", "people-source", "Student profiles: ");
  studentsCredit.appendChild(window.RVI.externalLink({label: "RAM students", url: "https://www.ram.eemcs.utwente.nl/about-us/students"}));
  container.appendChild(studentsCredit);
})();
