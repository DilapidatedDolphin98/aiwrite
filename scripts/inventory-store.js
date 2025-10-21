const STORAGE_KEY = 'prestige-auto-demo-inventory';

const defaultInventory = [
  {
    id: 'car-1',
    year: 2022,
    make: 'Audi',
    model: 'Q5 S line Premium',
    priceValue: 44850,
    mileageValue: 12400,
    description:
      'Quattro all-wheel drive, panoramic sunroof, and the full S line appearance package.',
    image:
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'San Francisco, CA',
    color: 'Glacier White',
    highlights: ['Quattro AWD', 'Bang & Olufsen audio', 'Driver Assistance Plus'],
  },
  {
    id: 'car-2',
    year: 2021,
    make: 'BMW',
    model: '330i xDrive',
    priceValue: 38250,
    mileageValue: 21150,
    description:
      'M Sport package sedan with heated seats, digital cockpit, and adaptive LED headlights.',
    image:
      'https://images.unsplash.com/photo-1523987355523-c7b5b84f3659?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523987355523-c7b5b84f3659?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80&crop=entropy',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80&sat=-100',
    ],
    sold: false,
    bodyType: 'Sedan',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Chicago, IL',
    color: 'Mineral Grey',
    highlights: ['M Sport package', 'Live Cockpit Professional', 'Heated steering wheel'],
  },
  {
    id: 'car-3',
    year: 2023,
    make: 'Mercedes-Benz',
    model: 'GLC 300 4MATIC',
    priceValue: 52990,
    mileageValue: 5800,
    description:
      'One-owner luxury SUV featuring Burmester audio, driver assistance, and 4MATIC all-wheel drive.',
    image:
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Boston, MA',
    color: 'Selenite Grey',
    highlights: ['Burmester surround sound', 'MBUX navigation', 'Driver assistance package'],
  },
  {
    id: 'car-4',
    year: 2020,
    make: 'Porsche',
    model: 'Macan S',
    priceValue: 61400,
    mileageValue: 16050,
    description:
      'Twin-turbo V6 power with Sport Chrono, upgraded 20" wheels, and a full leather interior.',
    image:
      'https://images.unsplash.com/photo-1503377983251-58a5b42309d4?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503377983251-58a5b42309d4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: true,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Los Angeles, CA',
    color: 'Carmine Red',
    highlights: ['Sport Chrono package', 'Adaptive air suspension', 'Premium package plus'],
  },
  {
    id: 'car-5',
    year: 2019,
    make: 'Lexus',
    model: 'RX 350 F Sport',
    priceValue: 34975,
    mileageValue: 32800,
    description:
      'F Sport handling, Mark Levinson audio, and a complete service history from new.',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80&sat=-50',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Austin, TX',
    color: 'Nebula Grey Pearl',
    highlights: ['Mark Levinson audio', 'F Sport handling', 'Heated & ventilated seats'],
  },
  {
    id: 'car-6',
    year: 2022,
    make: 'Tesla',
    model: 'Model Y Long Range',
    priceValue: 48990,
    mileageValue: 9600,
    description: 'Dual motor AWD, premium interior upgrade, and Enhanced Autopilot activated.',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1549921296-3ecf9a5c63c5?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80&sat=-100',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Electric',
    transmission: 'Single-speed',
    location: 'Seattle, WA',
    color: 'Pearl White Multi-Coat',
    highlights: ['Dual motor AWD', 'Enhanced Autopilot', 'Premium interior'],
  },
  {
    id: 'car-7',
    year: 2023,
    make: 'Cadillac',
    model: 'Escalade Sport Platinum',
    priceValue: 92700,
    mileageValue: 4200,
    description:
      'Hands-free Super Cruise, rear-seat entertainment, and the 36-speaker AKG Studio Reference audio.',
    image:
      'https://images.unsplash.com/photo-1594502184342-2d1b5d3e3f83?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594502184342-2d1b5d3e3f83?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Dallas, TX',
    color: 'Black Raven',
    highlights: ['Super Cruise', 'AKG Studio Reference audio', 'Rear-seat entertainment'],
  },
  {
    id: 'car-8',
    year: 2018,
    make: 'Jaguar',
    model: 'F-Type R Dynamic',
    priceValue: 56300,
    mileageValue: 28900,
    description:
      'Supercharged V6 coupe with performance exhaust, suede interior accents, and 20" cyclone wheels.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80&sat=-100',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80&crop=entropy',
    ],
    sold: true,
    bodyType: 'Coupe',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Miami, FL',
    color: 'Firenze Red',
    highlights: ['Performance exhaust', 'Meridian surround sound', 'Carbon fiber interior package'],
  },
  {
    id: 'car-9',
    year: 2021,
    make: 'Land Rover',
    model: 'Defender 110 X-Dynamic',
    priceValue: 64880,
    mileageValue: 18950,
    description:
      'Adventure ready with air suspension, cold climate pack, and full terrain response 2 system.',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517949908112-5df8e9dcefb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=80&sat=-25',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    location: 'Denver, CO',
    color: 'Pangea Green',
    highlights: ['Air suspension', 'Terrain Response 2', 'Cold climate package'],
  },
  {
    id: 'car-10',
    year: 2020,
    make: 'Volvo',
    model: 'XC90 Inscription',
    priceValue: 45600,
    mileageValue: 24300,
    description:
      'Seven-passenger luxury SUV with air suspension, advanced safety suite, and nappa leather seating.',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80&sat=-20',
      'https://images.unsplash.com/photo-1579439228777-7a7b95fb0ac1?auto=format&fit=crop&w=1600&q=80',
    ],
    sold: false,
    bodyType: 'SUV',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    location: 'Portland, OR',
    color: 'Onyx Black',
    highlights: ['Air suspension', 'Pilot Assist', 'Nappa leather'],
  },
];

function formatCurrency(value) {
  if (Number.isFinite(value)) {
    return `$${value.toLocaleString()}`;
  }
  const parsed = parseCurrency(String(value));
  return `$${parsed.toLocaleString()}`;
}

function parseCurrency(value) {
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? Math.round(numeric) : 0;
}

function formatMileage(value) {
  if (Number.isFinite(value)) {
    return `${Math.round(value).toLocaleString()} mi`;
  }
  const numeric = Number(String(value).replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? `${Math.round(numeric).toLocaleString()} mi` : '';
}

function normalizeVehicle(vehicle) {
  if (!vehicle || typeof vehicle !== 'object') return null;

  const priceValue = Number.isFinite(vehicle.priceValue)
    ? vehicle.priceValue
    : parseCurrency(vehicle.price);
  const mileageValue = Number.isFinite(vehicle.mileageValue)
    ? vehicle.mileageValue
    : Number(String(vehicle.mileage).replace(/[^0-9.]/g, ''));

  const gallery = Array.isArray(vehicle.gallery)
    ? vehicle.gallery.filter(Boolean)
    : [];

  const primaryImage = vehicle.image || gallery[0] || '';
  const normalizedGallery = gallery.length
    ? [...gallery]
    : primaryImage
    ? [primaryImage]
    : [];

  const highlights = Array.isArray(vehicle.highlights)
    ? vehicle.highlights.filter(Boolean)
    : [];

  return {
    id: vehicle.id || `vehicle-${Date.now()}`,
    year: Number.isFinite(vehicle.year) ? vehicle.year : new Date().getFullYear(),
    make: vehicle.make || 'Unknown',
    model: vehicle.model || '',
    price: formatCurrency(vehicle.price ?? priceValue),
    priceValue,
    mileage: formatMileage(vehicle.mileage ?? mileageValue),
    mileageValue: Number.isFinite(mileageValue) ? mileageValue : 0,
    description: vehicle.description || '',
    image: primaryImage,
    gallery: normalizedGallery,
    sold: Boolean(vehicle.sold),
    bodyType: vehicle.bodyType || 'Vehicle',
    fuel: vehicle.fuel || 'Gasoline',
    transmission: vehicle.transmission || 'Automatic',
    location: vehicle.location || 'Inquire for availability',
    color: vehicle.color || 'Multi',
    highlights: highlights.length ? [...highlights] : ['Detailed history available'],
  };
}

function loadInventory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed
          .map((item) => normalizeVehicle(item))
          .filter((item) => item !== null);
      }
    }
  } catch (error) {
    console.warn('Unable to read stored inventory', error);
  }
  return defaultInventory.map((item) => normalizeVehicle(item));
}

function ensureInventory() {
  const inventory = loadInventory();
  if (!inventory.length) {
    saveInventory(defaultInventory.map((item) => normalizeVehicle(item)));
    return loadInventory();
  }
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveInventory(inventory);
  }
  return inventory;
}

function saveInventory(vehicles) {
  try {
    const normalized = vehicles.map((vehicle) => normalizeVehicle(vehicle));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch (error) {
    console.warn('Unable to save inventory', error);
  }
}

export { STORAGE_KEY, defaultInventory, loadInventory, ensureInventory, saveInventory, normalizeVehicle };
