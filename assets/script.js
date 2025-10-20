(function () {
  const priceFilter = document.querySelector("#filter-price");
  const typeFilter = document.querySelector("#filter-type");
  const vehicleCards = Array.from(document.querySelectorAll(".vehicle-card"));
  const currentYearEl = document.querySelector("#current-year");

  function updateYear() {
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  function matchesPrice(card, filterValue) {
    const price = Number(card.dataset.price || 0);

    switch (filterValue) {
      case "under-15000":
        return price < 15000;
      case "15000-25000":
        return price >= 15000 && price <= 25000;
      case "25000-35000":
        return price > 25000 && price <= 35000;
      case "over-35000":
        return price > 35000;
      default:
        return true;
    }
  }

  function matchesType(card, filterValue) {
    if (filterValue === "all") return true;
    return card.dataset.type === filterValue;
  }

  function applyFilters() {
    const priceValue = priceFilter?.value ?? "all";
    const typeValue = typeFilter?.value ?? "all";

    vehicleCards.forEach((card) => {
      const show = matchesPrice(card, priceValue) && matchesType(card, typeValue);
      card.style.display = show ? "grid" : "none";
    });
  }

  priceFilter?.addEventListener("change", applyFilters);
  typeFilter?.addEventListener("change", applyFilters);

  updateYear();
})();
