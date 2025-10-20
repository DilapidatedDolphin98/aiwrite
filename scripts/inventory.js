const STORAGE_KEY = 'prestige-auto-demo-inventory';

const defaultInventory = [
  {
    id: 'car-1',
    year: 2022,
    make: 'Audi',
    model: 'Q5 S line Premium',
    price: '$44,850',
    mileage: '12,400 mi',
    description: 'Quattro all-wheel drive, panoramic sunroof, and the full S line appearance package.',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-2',
    year: 2021,
    make: 'BMW',
    model: '330i xDrive',
    price: '$38,250',
    mileage: '21,150 mi',
    description: 'M Sport package sedan with heated seats, digital cockpit, and adaptive LED headlights.',
    image:
      'https://images.unsplash.com/photo-1523987355523-c7b5b84f3659?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-3',
    year: 2023,
    make: 'Mercedes-Benz',
    model: 'GLC 300 4MATIC',
    price: '$52,990',
    mileage: '5,800 mi',
    description: 'One-owner luxury SUV featuring Burmester audio, driver assistance, and 4MATIC all-wheel drive.',
    image:
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-4',
    year: 2020,
    make: 'Porsche',
    model: 'Macan S',
    price: '$61,400',
    mileage: '16,050 mi',
    description: 'Twin-turbo V6 power with Sport Chrono, upgraded 20" wheels, and a full leather interior.',
    image:
      'https://images.unsplash.com/photo-1503377983251-58a5b42309d4?auto=format&fit=crop&w=1200&q=80',
    sold: true,
  },
  {
    id: 'car-5',
    year: 2019,
    make: 'Lexus',
    model: 'RX 350 F Sport',
    price: '$34,975',
    mileage: '32,800 mi',
    description: 'F Sport handling, Mark Levinson audio, and a complete service history from new.',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-6',
    year: 2022,
    make: 'Tesla',
    model: 'Model Y Long Range',
    price: '$48,990',
    mileage: '9,600 mi',
    description: 'Dual motor AWD, premium interior upgrade, and Enhanced Autopilot activated.',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-7',
    year: 2023,
    make: 'Cadillac',
    model: 'Escalade Sport Platinum',
    price: '$92,700',
    mileage: '4,200 mi',
    description: 'Hands-free Super Cruise, rear-seat entertainment, and the 36-speaker AKG Studio Reference audio.',
    image:
      'https://images.unsplash.com/photo-1594502184342-2d1b5d3e3f83?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-8',
    year: 2018,
    make: 'Jaguar',
    model: 'F-Type R Dynamic',
    price: '$56,300',
    mileage: '28,900 mi',
    description: 'Supercharged V6 coupe with performance exhaust, suede interior accents, and 20" cyclone wheels.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    sold: true,
  },
  {
    id: 'car-9',
    year: 2021,
    make: 'Land Rover',
    model: 'Defender 110 X-Dynamic',
    price: '$64,880',
    mileage: '18,950 mi',
    description: 'Adventure ready with air suspension, cold climate pack, and full terrain response 2 system.',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
  {
    id: 'car-10',
    year: 2020,
    make: 'Volvo',
    model: 'XC90 Inscription',
    price: '$45,600',
    mileage: '24,300 mi',
    description: 'Seven-passenger luxury SUV with air suspension, advanced safety suite, and nappa leather seating.',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    sold: false,
  },
];

let vehicles = loadInventory();

const inventoryGrid = document.getElementById('inventory-grid');
const addVehicleForm = document.getElementById('add-vehicle-form');
const resetButton = document.getElementById('reset-demo');

function loadInventory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Unable to read stored inventory', error);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInventory));
  return [...defaultInventory];
}

function saveInventory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
}

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

  const toggleButton = document.createElement('button');
  toggleButton.type = 'button';
  toggleButton.className = 'btn btn-secondary';
  toggleButton.textContent = vehicle.sold ? 'Mark as available' : 'Mark as sold';
  toggleButton.addEventListener('click', () => toggleSold(vehicle.id));

  actions.append(toggleButton);

  content.append(name, meta, description, status, actions);
  card.appendChild(content);

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
  saveInventory();
  renderInventory();
}

if (addVehicleForm) {
  addVehicleForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(addVehicleForm);
    const newVehicle = {
      id: `vehicle-${Date.now()}`,
      year: Number(formData.get('year')),
      make: String(formData.get('make')).trim(),
      model: String(formData.get('model')).trim(),
      price: String(formData.get('price')).trim(),
      mileage: String(formData.get('mileage')).trim(),
      image: String(formData.get('image')).trim(),
      description: String(formData.get('description')).trim(),
      sold: false,
    };

    vehicles = [newVehicle, ...vehicles];
    saveInventory();
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
    vehicles = [...defaultInventory];
    saveInventory();
    renderInventory();
  });
}

renderInventory();
