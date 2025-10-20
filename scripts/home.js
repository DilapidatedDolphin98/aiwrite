(function () {
  const featuredList = document.querySelector("[data-featured-inventory]");
  const statsContainer = document.querySelector("[data-market-stats]");

  function renderFeaturedVehicles() {
    if (!featuredList || !window.initialInventory) return;
    const combined = [...window.initialInventory];
    const featured = combined.slice(0, 3);
    featuredList.innerHTML = "";

    featured.forEach((vehicle) => {
      const card = document.createElement("article");
      card.className = "featured-card";
      card.innerHTML = `
        <div class="featured-card__media">
          <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" loading="lazy" />
        </div>
        <div class="featured-card__content">
          <h3>${vehicle.make} ${vehicle.model}</h3>
          <p class="featured-card__price">$${vehicle.price.toLocaleString()}</p>
          <p class="featured-card__meta">${vehicle.year} · ${vehicle.mileage.toLocaleString()} miles · ${vehicle.bodyType}</p>
          <ul class="featured-card__highlights">
            ${vehicle.highlights
              .slice(0, 2)
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ul>
          <a class="button" href="inventory.html">View in inventory</a>
        </div>
      `;
      featuredList.appendChild(card);
    });
  }

  function renderMarketStats() {
    if (!statsContainer || !window.initialInventory) return;
    const base = window.initialInventory;
    const averagePrice = Math.round(base.reduce((total, car) => total + car.price, 0) / base.length);
    const averageMileage = Math.round(
      base.reduce((total, car) => total + car.mileage, 0) / base.length
    );
    const newestYear = base.reduce((max, car) => Math.max(max, car.year), 0);

    statsContainer.innerHTML = `
      <div class="stat-card">
        <span class="stat-card__label">Average price</span>
        <strong class="stat-card__value">$${averagePrice.toLocaleString()}</strong>
        <span class="stat-card__hint">Across the full catalog</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">Average mileage</span>
        <strong class="stat-card__value">${averageMileage.toLocaleString()} mi</strong>
        <span class="stat-card__hint">Well-maintained vehicles</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">Newest arrival</span>
        <strong class="stat-card__value">${newestYear}</strong>
        <span class="stat-card__hint">Multiple 2024 models in stock</span>
      </div>
    `;
  }

  renderFeaturedVehicles();
  renderMarketStats();
})();
