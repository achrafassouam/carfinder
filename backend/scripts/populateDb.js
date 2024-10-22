require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Car = require('../models/Car');

const carsData = [
  {
    brand: 'Toyota',
    model: 'Camry',
    price: 25000,
    transmission: 'Automatic',
    bodyType: 'Sedan',
    seatingCapacity: 5,
    fuelType: 'Gasoline',
  },
  {
    brand: 'Honda',
    model: 'Civic',
    price: 22000,
    transmission: 'Manual',
    bodyType: 'Hatchback',
    seatingCapacity: 5,
    fuelType: 'Gasoline',
  },
  {
    brand: 'Tesla',
    model: 'Model 3',
    price: 45000,
    transmission: 'Automatic',
    bodyType: 'Sedan',
    seatingCapacity: 5,
    fuelType: 'Electric',
  },
  // Add more car data as needed
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    await Car.deleteMany({}); // Clear existing data
    const insertedCars = await Car.insertMany(carsData);
    console.log(`${insertedCars.length} cars inserted into the database`);
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch((err) => console.error('MongoDB connection error:', err));
