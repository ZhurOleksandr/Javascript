class Vehicle {
  #fuelLevel;

  constructor(brand, model, year, mileage = 0, fuelLevel = 0) {
    this.brand = brand;
    this.model = model;
    this.year = Number(year);
    this.mileage = Number(mileage);
    this.#fuelLevel = Number(fuelLevel);
  }

  get fuelLevel() {
    return this.#fuelLevel;
  }

  set fuelLevel(value) {
    const n = Number(value);
    if (Number.isNaN(n) || n < 0 || n > 100) throw new Error('Fuel level must be between 0 and 100');
    this.#fuelLevel = n;
  }

  get type() {
    return this.constructor.name;
  }

  drive(distance) {
    const d = Number(distance);
    if (Number.isNaN(d) || d <= 0) throw new Error('Distance must be positive');
    const fuelNeeded = d * 0.1;
    if (this.#fuelLevel < fuelNeeded) throw new Error('Not enough fuel');
    this.#fuelLevel = Math.max(0, this.#fuelLevel - fuelNeeded);
    this.mileage += d;
    return `${this.type} ${this.brand} ${this.model} drove ${d} km`;
  }

  refuel(amount) {
    const a = Number(amount);
    if (Number.isNaN(a) || a <= 0) throw new Error('Refuel amount must be positive');
    this.#fuelLevel = Math.min(100, this.#fuelLevel + a);
    return `${this.type} refueled by ${a}`;
  }

  getMaintenance() {
    const age = new Date().getFullYear() - this.year;
    return Math.round(300 + age * 40 + this.mileage * 0.02);
  }

  getInfo() {
    return {
      type: this.type,
      brand: this.brand,
      model: this.model,
      year: this.year,
      mileage: this.mileage,
      fuelLevel: this.fuelLevel
    };
  }

  static sortByMileage(items, desc = false) {
    return [...items].sort((a, b) => desc ? b.mileage - a.mileage : a.mileage - b.mileage);
  }

  static filterByYear(items, minYear) {
    return items.filter(item => item.year >= Number(minYear));
  }

  static filterByMileage(items, maxMileage) {
    return items.filter(item => item.mileage <= Number(maxMileage));
  }
}

class Car extends Vehicle {
  constructor(brand, model, year, mileage, fuelLevel, doors = 4, transmission = 'automatic') {
    super(brand, model, year, mileage, fuelLevel);
    this.doors = Number(doors);
    this.transmission = transmission;
  }

  getMaintenance() {
    return Math.round(super.getMaintenance() * 1.1);
  }
}

class Truck extends Vehicle {
  #isLoaded;

  constructor(brand, model, year, mileage, fuelLevel, loadCapacity = 1000, isLoaded = false) {
    super(brand, model, year, mileage, fuelLevel);
    this.loadCapacity = Number(loadCapacity);
    this.#isLoaded = isLoaded === true || isLoaded === 'true';
  }

  get isLoaded() {
    return this.#isLoaded;
  }

  set isLoaded(value) {
    this.#isLoaded = value === true || value === 'true';
  }

  getMaintenance() {
    return Math.round(super.getMaintenance() * 1.2);
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model, year, mileage, fuelLevel, motoType = 'sport') {
    super(brand, model, year, mileage, fuelLevel);
    this.motoType = motoType;
  }

  getMaintenance() {
    return Math.round(super.getMaintenance() * 0.8);
  }
}

class Fleet {
  constructor() {
    this.vehicles = [];
    this.nextId = 1;
  }

  add(vehicle) {
    const item = { id: this.nextId++, vehicle };
    this.vehicles.push(item);
    return item;
  }

  remove(id) {
    const before = this.vehicles.length;
    this.vehicles = this.vehicles.filter(item => item.id !== Number(id));
    return this.vehicles.length < before;
  }

  getById(id) {
    const found = this.vehicles.find(item => item.id === Number(id));
    return found ? found.vehicle : null;
  }

  getAll() {
    return [...this.vehicles];
  }

  getStatistics() {
    if (this.vehicles.length === 0) {
      return { count: 0, averageMileage: 0, totalMaintenance: 0 };
    }
    const count = this.vehicles.length;
    const averageMileage = this.vehicles.reduce((sum, item) => sum + item.vehicle.mileage, 0) / count;
    const totalMaintenance = this.vehicles.reduce((sum, item) => sum + item.vehicle.getMaintenance(), 0);
    return {
      count,
      averageMileage: Math.round(averageMileage),
      totalMaintenance
    };
  }

  static filterByType(items, typeName) {
    if (typeName === 'all') return [...items];
    return items.filter(item => item.vehicle.type === typeName);
  }
}

const fleet = new Fleet();
const output = document.getElementById('output');
const fleetSelect = document.getElementById('fleetSelect');

function createVehicleFromForm() {
  const type = document.getElementById('vehicleType').value;
  const brand = document.getElementById('brand').value.trim();
  const model = document.getElementById('model').value.trim();
  const year = document.getElementById('year').value;
  const mileage = document.getElementById('mileage').value;
  const fuelLevel = document.getElementById('fuelLevel').value;
  const extra1 = document.getElementById('extra1').value.trim();
  const extra2 = document.getElementById('extra2').value.trim();

  if (!brand || !model) throw new Error('Brand and model are required');

  if (type === 'car') return new Car(brand, model, year, mileage, fuelLevel, extra1, extra2);
  if (type === 'truck') return new Truck(brand, model, year, mileage, fuelLevel, extra1, extra2);
  return new Motorcycle(brand, model, year, mileage, fuelLevel, extra1 || extra2);
}

function renderFleet(items = fleet.getAll()) {
  fleetSelect.innerHTML = '';
  if (items.length === 0) {
    output.textContent = 'Fleet is empty';
    return;
  }

  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `#${item.id} | ${item.vehicle.type} | ${item.vehicle.brand} ${item.vehicle.model}`;
    fleetSelect.appendChild(option);
  });

  output.textContent = JSON.stringify(
    items.map(item => ({ id: item.id, ...item.vehicle.getInfo(), maintenance: item.vehicle.getMaintenance() })),
    null,
    2
  );
}

function selectedId() {
  return Number(fleetSelect.value);
}

document.getElementById('addBtn').addEventListener('click', () => {
  try {
    const vehicle = createVehicleFromForm();
    fleet.add(vehicle);
    renderFleet();
  } catch (error) {
    output.textContent = error.message;
  }
});

document.getElementById('driveBtn').addEventListener('click', () => {
  try {
    const vehicle = fleet.getById(selectedId());
    if (!vehicle) throw new Error('Vehicle not found');
    const message = vehicle.drive(document.getElementById('driveDistance').value);
    output.textContent = message;
    renderFleet();
  } catch (error) {
    output.textContent = error.message;
  }
});

document.getElementById('refuelBtn').addEventListener('click', () => {
  try {
    const vehicle = fleet.getById(selectedId());
    if (!vehicle) throw new Error('Vehicle not found');
    const message = vehicle.refuel(document.getElementById('refuelAmount').value);
    output.textContent = message;
    renderFleet();
  } catch (error) {
    output.textContent = error.message;
  }
});

document.getElementById('maintenanceBtn').addEventListener('click', () => {
  try {
    const vehicle = fleet.getById(selectedId());
    if (!vehicle) throw new Error('Vehicle not found');
    output.textContent = `Maintenance: ${vehicle.getMaintenance()}`;
  } catch (error) {
    output.textContent = error.message;
  }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
  const ok = fleet.remove(selectedId());
  output.textContent = ok ? 'Deleted' : 'Vehicle not found';
  renderFleet();
});

document.getElementById('applyFilterBtn').addEventListener('click', () => {
  const type = document.getElementById('filterType').value;
  const minYear = document.getElementById('filterYear').value;
  const maxMileage = document.getElementById('filterMileage').value;

  let items = fleet.getAll();
  items = Fleet.filterByType(items, type);
  items = Vehicle.filterByYear(items.map(i => i.vehicle ? i.vehicle : i), minYear).map(vehicle => {
    const found = fleet.getAll().find(item => item.vehicle === vehicle);
    return found;
  }).filter(Boolean);
  items = Vehicle.filterByMileage(items.map(i => i.vehicle), maxMileage).map(vehicle => fleet.getAll().find(item => item.vehicle === vehicle)).filter(Boolean);

  renderFleet(items);
});

document.getElementById('statsBtn').addEventListener('click', () => {
  const stats = fleet.getStatistics();
  output.textContent = JSON.stringify(stats, null, 2);
});

document.getElementById('showAllBtn').addEventListener('click', () => {
  renderFleet();
});

window.fleet = fleet;
window.Vehicle = Vehicle;
window.Car = Car;
window.Truck = Truck;
window.Motorcycle = Motorcycle;