require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Car = require('../models/Car');

// Object mapping brands to their models
const brandModels = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Tundra', '4Runner', 'Sienna'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Edge', 'Ranger', 'Fusion', 'Focus'],
  Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Camaro', 'Tahoe', 'Suburban', 'Colorado'],
  Nissan: ['Altima', 'Rogue', 'Sentra', 'Murano', 'Pathfinder', 'Maxima', 'Frontier', 'Titan'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', 'M3', 'M5'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'A-Class', 'CLA', 'GLA'],
  Audi: ['A4', 'Q5', 'A6', 'Q7', 'A3', 'Q3', 'S4', 'RS5'],
  Volkswagen: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'ID.4', 'Arteon', 'Taos'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Venue', 'Ioniq'],
  Kia: ['Forte', 'Optima', 'Sorento', 'Sportage', 'Telluride', 'Soul', 'Seltos', 'Carnival'],
  Mazda: ['Mazda3', 'CX-5', 'Mazda6', 'CX-9', 'CX-30', 'MX-5 Miata', 'CX-3'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Crosstrek', 'Ascent', 'Legacy', 'WRX'],
  Lexus: ['RX', 'ES', 'NX', 'IS', 'GX', 'UX', 'LS', 'LC'],
  Volvo: ['XC90', 'XC60', 'S60', 'V60', 'XC40', 'S90', 'V90']
};

const transmissions = ['Automatic', 'Manual', 'CVT', 'Dual-Clutch'];
const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Wagon', 'Convertible'];
const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];

// Generic image URLs based on body type
const genericImages = {
  Sedan: './images/generic/sedan.jpg',
  SUV: './images/generic/suv.jpg',
  Hatchback: './images/generic/hatchback.jpg',
  Coupe: './images/generic/coupe.jpg',
  Truck: './images/generic/truck.jpg',
  Van: './images/generic/van.jpg',
  Wagon: './images/generic/wagon.jpg',
  Convertible: './images/generic/convertible.jpg',
};

// Function to generate a random car
const generateRandomCar = () => {
  const brand = faker.helpers.arrayElement(Object.keys(brandModels));
  const model = faker.helpers.arrayElement(brandModels[brand]);
  const bodyType = faker.helpers.arrayElement(bodyTypes);
  
  return {
    brand,
    model,
    price: faker.number.int({ min: 15000, max: 100000 }),
    transmission: faker.helpers.arrayElement(transmissions),
    bodyType,
    seatingCapacity: faker.helpers.arrayElement([2, 4, 5, 6, 7, 8]),
    fuelType: faker.helpers.arrayElement(fuelTypes),
    imageUrl: genericImages[bodyType] || '/images/generic/default.jpg'
  };
};

// Number of cars to generate
const NUM_CARS = 1000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await Car.deleteMany({});
    console.log('Cleared existing car data');

    // Generate and insert new cars
    const cars = Array.from({ length: NUM_CARS }, generateRandomCar);
    const insertedCars = await Car.insertMany(cars);
    console.log(`${insertedCars.length} cars inserted into the database`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch((err) => console.error('MongoDB connection error:', err));
