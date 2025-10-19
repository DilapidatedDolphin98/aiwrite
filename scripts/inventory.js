(function () {
  const inventoryGrid = document.querySelector("[data-inventory-grid]");
  const inventoryCount = document.querySelector("[data-inventory-count]");
  const activeFilterContainer = document.querySelector("[data-active-filters]");
  const clearFiltersButton = document.querySelector("[data-clear-filters]");
  const viewToggleButtons = document.querySelectorAll("[data-view]");

  const controls = {
    search: document.querySelector("#searchFilter"),
    make: document.querySelector("#makeFilter"),
    body: document.querySelector("#bodyFilter"),
    fuel: document.querySelector("#fuelFilter"),
    minPrice: document.querySelector("#minPrice"),
    maxPrice: document.querySelector("#maxPrice"),
    maxMileage: document.querySelector("#maxMileage"),
    sort: document.querySelector("#sortBy"),
  };

  const filters = {
    search: "",
    make: "all",
    body: "all",
    fuel: "all",
    minPrice: "",
    maxPrice: "",
    maxMileage: "",
    sort: "recommended",
    view: "grid",
  };

  const inventoryData = window.initialInventory || [];

  function getMergedInventory() {
    const customInventory = typeof window.getCustomInventory === "function" ? window.getCustomInventory() : [];
    return [...inventoryData, ...customInventory];
  }

  function applyFilters(data) {
    let filtered = [...data];

    if (filters.search) {
      const needle = filters.search.toLowerCase();
      filtered = filtered.filter((item) =>
        [item.make, item.model, item.bodyType, item.fuel, item.location]
          .join(" ")
          .toLowerCase()
          .includes(needle)
      );
    }

    if (filters.make !== "all") {
      filtered = filtered.filter((item) => item.make === filters.make);
    }

    if (filters.body !== "all") {
      filtered = filtered.filter((item) => item.bodyType === filters.body);
    }

    if (filters.fuel !== "all") {
      filtered = filtered.filter((item) => item.fuel === filters.fuel);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((item) => item.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((item) => item.price <= Number(filters.maxPrice));
    }

    if (filters.maxMileage) {
      filtered = filtered.filter((item) => item.mileage <= Number(filters.maxMileage));
    }

    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "mileage":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "newest":
        filtered.sort((a, b) => b.year - a.year);
        break;
      default:
        filtered.sort((a, b) => a.make.localeCompare(b.make));
    }

    return filtered;
  }

  function renderInventory() {
    if (!inventoryGrid) return;
    const merged = getMergedInventory();
    const filtered = applyFilters(merged);

    inventoryGrid.innerHTML = "";

    if (!filtered.length) {
      inventoryGrid.innerHTML = `
        <div class="empty-state">
          <h3>No vehicles match the current filters</h3>
          <p>Try adjusting your filters or clearing them to see more options.</p>
        </div>
      `;
    } else {
      const fragment = document.createDocumentFragment();
      filtered.forEach((vehicle) => {
        fragment.appendChild(createInventoryCard(vehicle));
      });
      inventoryGrid.appendChild(fragment);
    }

    if (inventoryCount) {
      inventoryCount.textContent = `${filtered.length} vehicle${filtered.length === 1 ? "" : "s"} available`;
    }

    renderActiveFilters();
  }

  function createInventoryCard(vehicle) {
    const card = document.createElement("article");
    card.className = `inventory-card inventory-card--${filters.view}`;
    card.innerHTML = `
      <div class="inventory-card__media">
        <img src="${vehicle.image}" alt="${vehicle.year} ${vehicle.make} ${vehicle.model}" loading="lazy" />
        <span class="inventory-card__badge">${vehicle.year}</span>
      </div>
      <div class="inventory-card__content">
        <div class="inventory-card__header">
          <h3>${vehicle.make} ${vehicle.model}</h3>
          <p class="inventory-card__price">$${vehicle.price.toLocaleString()}</p>
        </div>
        <p class="inventory-card__meta">
          <span>${vehicle.bodyType}</span>
          <span>${vehicle.fuel}</span>
          <span>${vehicle.transmission}</span>
        </p>
        <ul class="inventory-card__highlights">
          ${vehicle.highlights
            .slice(0, 3)
            .map((item) => `<li>${item}</li>`)
            .join("")}
        </ul>
        <div class="inventory-card__footer">
          <div>
            <span>${vehicle.mileage.toLocaleString()} miles</span>
            <span> · ${vehicle.location}</span>
          </div>
          <button class="button button--ghost" type="button">View details</button>
        </div>
      </div>
    `;
    return card;
  }

  function populateSelectOptions() {
    const merged = getMergedInventory();
    const makes = new Set(["all"]);
    const bodies = new Set(["all"]);
    const fuels = new Set(["all"]);

    merged.forEach((vehicle) => {
      makes.add(vehicle.make);
      bodies.add(vehicle.bodyType);
      fuels.add(vehicle.fuel);
    });

    populateSelect(controls.make, [...makes]);
    populateSelect(controls.body, [...bodies]);
    populateSelect(controls.fuel, [...fuels]);
  }

  function populateSelect(select, options) {
    if (!select) return;
    select.innerHTML = options
      .map((value) => `<option value="${value}">${value === "all" ? "All" : value}</option>`)
      .join("");
  }

  function attachEventListeners() {
    if (!controls.search) return;

    Object.entries(controls).forEach(([key, control]) => {
      if (!control) return;
      control.addEventListener("input", () => {
        filters[key] = control.value.trim();
        renderInventory();
      });
    });

    if (clearFiltersButton) {
      clearFiltersButton.addEventListener("click", () => {
        filters.search = "";
        filters.make = "all";
        filters.body = "all";
        filters.fuel = "all";
        filters.minPrice = "";
        filters.maxPrice = "";
        filters.maxMileage = "";
        filters.sort = "recommended";
        Object.entries(controls).forEach(([key, control]) => {
          if (!control) return;
          const defaultValue = key === "sort" ? "recommended" : key === "make" || key === "body" || key === "fuel" ? "all" : "";
          control.value = defaultValue;
        });
        renderInventory();
      });
    }

    viewToggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedView = button.getAttribute("data-view");
        filters.view = selectedView;
        viewToggleButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
        inventoryGrid?.setAttribute("data-layout", selectedView);
        renderInventory();
      });
    });
  }

  function renderActiveFilters() {
    if (!activeFilterContainer) return;
    const activeFilters = [];

    if (filters.search) {
      activeFilters.push({ label: `Search: ${filters.search}`, key: "search" });
    }
    if (filters.make !== "all") {
      activeFilters.push({ label: `Make: ${filters.make}`, key: "make" });
    }
    if (filters.body !== "all") {
      activeFilters.push({ label: `Body: ${filters.body}`, key: "body" });
    }
    if (filters.fuel !== "all") {
      activeFilters.push({ label: `Fuel: ${filters.fuel}`, key: "fuel" });
    }
    if (filters.minPrice) {
      activeFilters.push({ label: `Min $${Number(filters.minPrice).toLocaleString()}`, key: "minPrice" });
    }
    if (filters.maxPrice) {
      activeFilters.push({ label: `Max $${Number(filters.maxPrice).toLocaleString()}`, key: "maxPrice" });
    }
    if (filters.maxMileage) {
      activeFilters.push({ label: `≤ ${Number(filters.maxMileage).toLocaleString()} miles`, key: "maxMileage" });
    }

    if (!activeFilters.length) {
      activeFilterContainer.innerHTML = "<p class=\"filter-hint\">Use the filters to refine the catalog.</p>";
      return;
    }

    activeFilterContainer.innerHTML = "";
    activeFilters.forEach((filter) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "filter-chip";
      chip.innerHTML = `${filter.label} <span aria-hidden=\"true\">&times;</span>`;
      chip.addEventListener("click", () => {
        filters[filter.key] = filter.key === "make" || filter.key === "body" || filter.key === "fuel" ? "all" : "";
        if (controls[filter.key]) {
          controls[filter.key].value = filters[filter.key];
        }
        renderInventory();
      });
      activeFilterContainer.appendChild(chip);
    });
  }

  populateSelectOptions();
  attachEventListeners();
  renderInventory();
})();
