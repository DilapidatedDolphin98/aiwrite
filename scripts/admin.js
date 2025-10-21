(function () {
  const ADMIN_PASSWORD = "drive2024";

  const loginSection = document.querySelector("[data-admin-login]");
  const dashboardSection = document.querySelector("[data-admin-dashboard]");
  const loginForm = document.querySelector("#adminLoginForm");
  const loginFeedback = document.querySelector("[data-login-feedback]");
  const logoutButton = document.querySelector("[data-logout]");
  const quickAddForm = document.querySelector("#quickAddForm");
  const quickAddFeedback = document.querySelector("[data-quick-add-feedback]");
  const inventoryList = document.querySelector("[data-admin-inventory]");

  function isAuthenticated() {
    try {
      return sessionStorage.getItem("isAdmin") === "true";
    } catch (error) {
      console.warn("Unable to access sessionStorage", error);
      return false;
    }
  }

  function setAuthenticated(state) {
    try {
      sessionStorage.setItem("isAdmin", state ? "true" : "false");
    } catch (error) {
      console.warn("Unable to persist admin session", error);
    }
  }

  function toggleViews() {
    const authenticated = isAuthenticated();
    if (loginSection) {
      loginSection.hidden = authenticated;
    }
    if (dashboardSection) {
      dashboardSection.hidden = !authenticated;
    }
    if (authenticated) {
      renderCustomInventory();
    }
  }

  function renderCustomInventory() {
    if (!inventoryList) return;
    const customInventory = window.getCustomInventory ? window.getCustomInventory() : [];
    inventoryList.innerHTML = "";

    if (!customInventory.length) {
      inventoryList.innerHTML = `
        <li class="admin-inventory__empty">
          <p>No custom vehicles added yet. Use the form above to publish your first listing.</p>
        </li>
      `;
      return;
    }

    customInventory.forEach((vehicle, index) => {
      const item = document.createElement("li");
      item.className = "admin-inventory__item";
      item.innerHTML = `
        <div>
          <h4>${vehicle.year} ${vehicle.make} ${vehicle.model}</h4>
          <p class="admin-inventory__meta">$${Number(vehicle.price).toLocaleString()} · ${Number(vehicle.mileage).toLocaleString()} miles</p>
          <p class="admin-inventory__tagline">${vehicle.bodyType} · ${vehicle.fuel}</p>
        </div>
        <button class="button button--ghost" type="button" data-remove-index="${index}">Remove</button>
      `;
      inventoryList.appendChild(item);
    });

    inventoryList.querySelectorAll("[data-remove-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.getAttribute("data-remove-index"));
        const current = window.getCustomInventory ? window.getCustomInventory() : [];
        current.splice(index, 1);
        window.saveCustomInventory?.(current);
        renderCustomInventory();
        notify(quickAddFeedback, "Vehicle removed", "info");
      });
    });
  }

  function notify(container, message, tone = "success") {
    if (!container) return;
    container.textContent = message;
    container.dataset.tone = tone;
    container.hidden = false;
    setTimeout(() => {
      container.hidden = true;
    }, 3000);
  }

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const password = formData.get("password");
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      notify(loginFeedback, "Welcome back! Admin tools unlocked.");
      toggleViews();
      loginForm.reset();
    } else {
      notify(loginFeedback, "That password is not correct.", "error");
    }
  });

  logoutButton?.addEventListener("click", () => {
    setAuthenticated(false);
    toggleViews();
  });

  quickAddForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(quickAddForm);
    const payload = Object.fromEntries(formData.entries());

    if (!payload.make || !payload.model || !payload.price) {
      notify(quickAddFeedback, "Please complete the required fields.", "error");
      return;
    }

    const primaryImage = payload.image ||
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80";
    const galleryEntries = payload.gallery
      ? payload.gallery
          .split(/\n|,|;/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
    const gallery = Array.from(new Set([primaryImage, ...galleryEntries]));

    const highlights = payload.highlights
      ? payload.highlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : ["New arrival"];

    const newVehicle = {
      id: `${payload.make}-${payload.model}-${Date.now()}`.toLowerCase().replace(/\s+/g, "-"),
      make: payload.make.trim(),
      model: payload.model.trim(),
      year: Number(payload.year) || new Date().getFullYear(),
      price: Number(payload.price),
      mileage: Number(payload.mileage) || 0,
      bodyType: payload.bodyType.trim() || "Sedan",
      fuel: payload.fuel.trim() || "Gasoline",
      transmission: payload.transmission.trim() || "Automatic",
      location: payload.location.trim() || "",
      color: payload.color.trim() || "",
      image: primaryImage,
      gallery,
      highlights,
    };

    const current = window.getCustomInventory ? window.getCustomInventory() : [];
    current.unshift(newVehicle);
    window.saveCustomInventory?.(current);
    renderCustomInventory();
    quickAddForm.reset();
    notify(quickAddFeedback, "Vehicle added to the catalog.");
  });

  toggleViews();
})();
