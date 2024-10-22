const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.post('/recommendations', async (req, res) => {
  const { brand, minPrice, maxPrice, transmission, bodyType, seatingCapacity, fuelType } = req.body;
  
  let query = {};
  
  if (brand) query.brand = brand;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }
  if (transmission) query.transmission = transmission;
  if (bodyType) query.bodyType = bodyType;
  if (seatingCapacity) query.seatingCapacity = parseInt(seatingCapacity);
  if (fuelType) query.fuelType = fuelType;

  try {
    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations', error: error.message });
  }
});

router.get('/brands', async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brands', error: error.message });
  }
});

router.get('/transmissions', async (req, res) => {
  try {
    const transmissions = await Car.distinct('transmission');
    res.json(transmissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transmissions', error: error.message });
  }
});

router.get('/bodyTypes', async (req, res) => {
  try {
    const bodyTypes = await Car.distinct('bodyType');
    res.json(bodyTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching body types', error: error.message });
  }
});

router.get('/fuelTypes', async (req, res) => {
  try {
    const fuelTypes = await Car.distinct('fuelType');
    res.json(fuelTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fuel types', error: error.message });
  }
});

module.exports = router;
