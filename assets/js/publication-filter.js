(function () {
  function filter(items, criteria) {
    return items.filter(function (item) {
      const yearMatches = !criteria.year || criteria.year === "all" || String(item.year) === String(criteria.year);
      const typeMatches = !criteria.type || criteria.type === "all" || item.type === criteria.type;
      const pillarMatches = !criteria.pillar || criteria.pillar === "all" || item.pillars.includes(criteria.pillar);
      return yearMatches && typeMatches && pillarMatches;
    });
  }

  window.RVIPublications = { filter: filter };
})();
