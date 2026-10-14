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
      copy.appendChild(create("h3", "", person.name));
      copy.appendChild(create("p", "role", person.role));
      if (person.summary) copy.appendChild(create("p", "", person.summary));
      const links = create("div", "text-links");
      (person.links || []).forEach(function (link) {
        links.appendChild(window.RVI.externalLink(link));
      });
      if (person.email) links.appendChild(window.RVI.externalLink({ label: "Email", url: "mailto:" + person.email }));
      copy.appendChild(links);
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
