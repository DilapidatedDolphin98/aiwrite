import { defaultInventory, ensureInventory, normalizeVehicle, saveInventory } from './inventory-store.js';

let vehicles = ensureInventory();

const inventoryGrid = document.getElementById('inventory-grid');
const addVehicleForm = document.getElementById('add-vehicle-form');
const resetButton = document.getElementById('reset-demo');

function createVehicleCard(vehicle) {
  const card = document.createElement('article');
  card.className = 'inventory-card';
  card.dataset.vehicleId = vehicle.id;
  if (vehicle.sold) {
    card.classList.add('sold');
  }

  const img = document.createElement('img');
  img.src = vehicle.image;
  img.alt = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  card.appendChild(img);

  const content = document.createElement('div');
  content.className = 'content';

  const name = document.createElement('h3');
  name.className = 'vehicle-name';
  name.textContent = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const meta = document.createElement('div');
  meta.className = 'vehicle-meta';

  const price = document.createElement('span');
  price.textContent = vehicle.price;
  const mileage = document.createElement('span');
  mileage.textContent = vehicle.mileage;
  meta.append(price, mileage);

  const description = document.createElement('p');
  description.className = 'vehicle-description';
  description.textContent = vehicle.description;

  const status = document.createElement('div');
  status.className = 'status';
  status.dataset.status = vehicle.sold ? 'sold' : 'available';
  status.textContent = vehicle.sold ? 'Status: Sold' : 'Status: Available';

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const detailsLink = document.createElement('a');
  detailsLink.href = `vehicle.html?id=${encodeURIComponent(vehicle.id)}`;
  detailsLink.className = 'btn btn-primary';
  detailsLink.textContent = 'View details';

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.className = 'btn btn-secondary';
  toggleButton.textContent = vehicle.sold ? 'Mark as available' : 'Mark as sold';
  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleSold(vehicle.id);
  });

  actions.append(detailsLink, toggleButton);

  content.append(name, meta, description, status, actions);
  card.appendChild(content);

  card.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    window.location.href = `vehicle.html?id=${encodeURIComponent(vehicle.id)}`;
  });

  card.addEventListener('keydown', (event) => {
    if (event.target.closest('button')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = `vehicle.html?id=${encodeURIComponent(vehicle.id)}`;
    }
  });

  card.tabIndex = 0;
  card.setAttribute('role', 'link');

  return card;
}

function renderInventory() {
  if (!inventoryGrid) return;
  inventoryGrid.innerHTML = '';
  vehicles.forEach((vehicle) => {
    inventoryGrid.appendChild(createVehicleCard(vehicle));
  });
}

function toggleSold(id) {
  vehicles = vehicles.map((vehicle) =>
    vehicle.id === id ? { ...vehicle, sold: !vehicle.sold } : vehicle,
  );
  saveInventory(vehicles);
  renderInventory();
}

function parseList(value) {
  return String(value || '')
    .split(/\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

if (addVehicleForm) {
  addVehicleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(addVehicleForm);
    const primaryImage = String(formData.get('image') || '').trim();
    const gallery = [primaryImage, ...parseList(formData.get('gallery'))];
    const uniqueGallery = Array.from(new Set(gallery.filter(Boolean)));

    const newVehicle = normalizeVehicle({
      id: `vehicle-${Date.now()}`,
      year: Number(formData.get('year')),
      make: String(formData.get('make')).trim(),
      model: String(formData.get('model')).trim(),
      price: formData.get('price'),
      mileage: formData.get('mileage'),
      image: primaryImage,
      gallery: uniqueGallery,
      description: String(formData.get('description') || '').trim(),
      sold: false,
      bodyType: String(formData.get('bodyType') || '').trim(),
      fuel: String(formData.get('fuel') || '').trim(),
      transmission: String(formData.get('transmission') || '').trim(),
      location: String(formData.get('location') || '').trim(),
      color: String(formData.get('color') || '').trim(),
      highlights: parseList(formData.get('highlights')),
    });

    vehicles = [newVehicle, ...vehicles];
    saveInventory(vehicles);
    renderInventory();
    addVehicleForm.reset();
    const yearInput = addVehicleForm.querySelector('input[name="year"]');
    if (yearInput) {
      yearInput.focus();
    }
  });
}

if (resetButton) {
  resetButton.addEventListener('click', () => {
    vehicles = defaultInventory.map((vehicle) => normalizeVehicle(vehicle));
    saveInventory(vehicles);
    renderInventory();
  });
}

renderInventory();
