const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
  transmission: String,
  bodyType: String,
  seatingCapacity: Number,
  fuelType: String,
  imageUrl: String
});

module.exports = mongoose.model('Car', carSchema);
