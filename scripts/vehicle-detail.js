import { ensureInventory } from './inventory-store.js';

const params = new URLSearchParams(window.location.search);
const vehicleId = params.get('id');

const detailContainer = document.querySelector('[data-vehicle-detail]');
const emptyState = document.querySelector('[data-vehicle-empty]');
const mainImage = document.querySelector('[data-gallery-main]');
const galleryStrip = document.querySelector('[data-gallery-strip]');
const titleEl = document.querySelector('[data-vehicle-title]');
const statusEl = document.querySelector('[data-vehicle-status]');
const priceEl = document.querySelector('[data-vehicle-price]');
const metaEl = document.querySelector('[data-vehicle-meta]');
const specsEl = document.querySelector('[data-vehicle-specs]');
const highlightsEl = document.querySelector('[data-vehicle-highlights]');
const descriptionEl = document.querySelector('[data-vehicle-description]');

function showNotFound() {
  if (detailContainer) {
    detailContainer.hidden = true;
  }
  if (emptyState) {
    emptyState.hidden = false;
  }
}

function renderSpecs(vehicle) {
  if (!specsEl) return;
  const specs = [
    ['Body style', vehicle.bodyType],
    ['Fuel', vehicle.fuel],
    ['Transmission', vehicle.transmission],
    ['Exterior', vehicle.color],
    ['Mileage', vehicle.mileage],
    ['Location', vehicle.location],
  ];
  specsEl.innerHTML = '';
  specs.forEach(([label, value]) => {
    if (!value) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'vehicle-specs__item';
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    wrapper.append(dt, dd);
    specsEl.appendChild(wrapper);
  });
}

function renderHighlights(vehicle) {
  if (!highlightsEl) return;
  highlightsEl.innerHTML = '';
  const highlights = Array.isArray(vehicle.highlights) ? vehicle.highlights : [];
  if (!highlights.length) {
    highlightsEl.closest('.vehicle-highlights')?.setAttribute('hidden', '');
    return;
  }
  highlightsEl.closest('.vehicle-highlights')?.removeAttribute('hidden');
  highlights.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    highlightsEl.appendChild(li);
  });
}

function setMainImage(url) {
  if (mainImage) {
    mainImage.src = url;
  }
}

function renderGallery(vehicle) {
  if (!galleryStrip) return;
  galleryStrip.innerHTML = '';
  const gallery = Array.isArray(vehicle.gallery) ? vehicle.gallery : [];
  if (!gallery.length) {
    galleryStrip.setAttribute('hidden', '');
    return;
  }
  galleryStrip.removeAttribute('hidden');

  gallery.forEach((url, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'vehicle-gallery__thumb';
    button.setAttribute('role', 'listitem');
    button.setAttribute('aria-label', `View photo ${index + 1}`);
    button.innerHTML = `<img src="${url}" alt="Thumbnail ${index + 1}" loading="lazy" />`;
    button.addEventListener('click', () => {
      setMainImage(url);
      highlightThumbnail(index);
    });
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMainImage(url);
        highlightThumbnail(index);
      }
    });
    galleryStrip.appendChild(button);
  });

  const firstImage = gallery[0];
  if (firstImage) {
    setMainImage(firstImage);
    highlightThumbnail(0);
  }
}

function highlightThumbnail(activeIndex) {
  if (!galleryStrip) return;
  const buttons = Array.from(galleryStrip.querySelectorAll('.vehicle-gallery__thumb'));
  buttons.forEach((button, index) => {
    if (index === activeIndex) {
      button.classList.add('is-active');
      button.setAttribute('aria-current', 'true');
    } else {
      button.classList.remove('is-active');
      button.removeAttribute('aria-current');
    }
  });
}

function renderVehicle(vehicle) {
  if (!vehicle) {
    showNotFound();
    return;
  }
  if (detailContainer) {
    detailContainer.hidden = false;
  }
  if (emptyState) {
    emptyState.hidden = true;
  }

  document.title = `${vehicle.year} ${vehicle.make} ${vehicle.model} | Prestige Auto Demo`;

  if (titleEl) {
    titleEl.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  }

  if (statusEl) {
    statusEl.dataset.status = vehicle.sold ? 'sold' : 'available';
    statusEl.textContent = vehicle.sold ? 'Sold vehicle' : 'Available now';
  }

  if (priceEl) {
    priceEl.textContent = vehicle.price;
  }

  if (metaEl) {
    metaEl.textContent = `${vehicle.mileage} · ${vehicle.bodyType}`;
  }

  if (descriptionEl) {
    descriptionEl.textContent = vehicle.description;
  }

  renderSpecs(vehicle);
  renderHighlights(vehicle);
  renderGallery(vehicle);

  if (mainImage) {
    mainImage.alt = `${vehicle.year} ${vehicle.make} ${vehicle.model} exterior photo`;
  }
}

const inventory = ensureInventory();
const vehicle = inventory.find((item) => item.id === vehicleId);
renderVehicle(vehicle);
