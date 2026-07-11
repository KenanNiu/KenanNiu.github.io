(function () {
  const container = document.getElementById("people-list");
  if (!container || !window.rviPeople) return;
  container.textContent = "";
  window.rviPeople.forEach(function (person) {
    const article = document.createElement("article");
    article.className = `person-card ${person.status}`;
    const image = person.image ? `<img src="${person.image}" alt="Portrait of ${person.name}">` : `<div class="person-placeholder" aria-hidden="true">RVI</div>`;
    const links = (person.links || []).map(function (link) { return `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`; }).join("");
    article.innerHTML = `${image}<div><span class="status">${person.status}</span><h2>${person.name}</h2><p class="role">${person.role}</p><p>${person.summary}</p><div class="text-links">${links}</div></div>`;
    container.appendChild(article);
  });
})();
