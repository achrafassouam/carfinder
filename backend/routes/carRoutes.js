const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all distinct brands
router.get('/brands', async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ message: 'Error fetching brands', error: error.message });
  }
});

// Get all distinct transmissions
router.get('/transmissions', async (req, res) => {
  try {
    const transmissions = await Car.distinct('transmission');
    res.status(200).json(transmissions);
  } catch (error) {
    console.error('Error fetching transmissions:', error);
    res.status(500).json({ message: 'Error fetching transmissions', error: error.message });
  }
});

// Get all distinct body types
router.get('/bodyTypes', async (req, res) => {
  try {
    const bodyTypes = await Car.distinct('bodyType');
    res.status(200).json(bodyTypes);
  } catch (error) {
    console.error('Error fetching body types:', error);
    res.status(500).json({ message: 'Error fetching body types', error: error.message });
  }
});

// Get all distinct fuel types
router.get('/fuelTypes', async (req, res) => {
  try {
    const fuelTypes = await Car.distinct('fuelType');
    res.status(200).json(fuelTypes);
  } catch (error) {
    console.error('Error fetching fuel types:', error);
    res.status(500).json({ message: 'Error fetching fuel types', error: error.message });
  }
});

// Fetch car recommendations based on filters
router.post('/recommendations', async (req, res) => {
  const { brand, minPrice, maxPrice, transmission, bodyType, seatingCapacity, fuelType } = req.body;
  
  let query = {};

  if (brand) query.brand = brand;
  if (minPrice) query.price = { ...query.price, $gte: parseInt(minPrice) };
  if (maxPrice) query.price = { ...query.price, $lte: parseInt(maxPrice) };
  if (transmission) query.transmission = transmission;
  if (bodyType) query.bodyType = bodyType;
  if (seatingCapacity) query.seatingCapacity = parseInt(seatingCapacity);
  if (fuelType) query.fuelType = fuelType;

  try {
    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
});

// Fetch car details by VIN (if applicable)
router.get('/car-details', async (req, res) => {
  const { vin } = req.query;

  if (!vin) {
    return res.status(400).json({ message: 'VIN is required to fetch car details' });
  }

  try {
    const car = await Car.findOne({ vin });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ message: 'Error fetching car details', error: error.message });
  }
});

// Create a new car entry (for admin use or seeding data)
router.post('/cars', async (req, res) => {
  const { brand, model, price, transmission, bodyType, seatingCapacity, fuelType, imageUrl } = req.body;

  if (!brand || !model || !price) {
    return res.status(400).json({ message: 'Brand, model, and price are required' });
  }

  try {
    const newCar = new Car({
      brand,
      model,
      price,
      transmission,
      bodyType,
      seatingCapacity,
      fuelType,
      imageUrl,
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error('Error adding new car:', error);
    res.status(500).json({ message: 'Error adding new car', error: error.message });
  }
});

// Delete a car entry by ID (for admin use)
router.delete('/cars/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: 'Error deleting car', error: error.message });
  }
});

module.exports = router;
