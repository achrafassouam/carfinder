import React from 'react';

const RecommendationsTable = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }

  const BASE_URL = 'http://localhost:5001';

  // Define your mapping of car types to image URLs
  const carTypeImages = {
    sedan: `${BASE_URL}/public/images/generic/sedan.jpg`,
    suv: `${BASE_URL}/public/images/generic/suv.jpg`,
    convertible: `${BASE_URL}/public/images/generic/convertible.jpg`,
    coupe: `${BASE_URL}/public/images/generic/coupe.jpg`,
    hatchback: `${BASE_URL}/public/images/generic/hatchback.jpg`,
    van: `${BASE_URL}/public/images/generic/van.jpg`,
    default: `${BASE_URL}/public/images/generic/default.jpg`,
    truck: `${BASE_URL}/public/images/generic/truck.jpg`,
  };

  return (
    <div className="recommendations">
      <h2>Recommendations:</h2>
      <div className="car-grid">
        {recommendations.map((car, index) => {
          return (
            <div key={index} className="car-card">
              <img 
                src={carTypeImages[car.bodyType]} 
                alt={`${car.brand} ${car.model}`} 
                className="car-image"
                onError={(e) => {
                  console.error(`Error loading image for ${car.brand} ${car.model}:`, e);
                  e.target.src = `${BASE_URL}/public/images/generic/default.jpg`; // Fallback image
                }}
              />
              <h3>{car.brand} {car.model}</h3>
              <p>Price: ${car.price}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Body Type: {car.bodyType}</p>
              <p>Seating Capacity: {car.seatingCapacity}</p>
              <p>Fuel Type: {car.fuelType}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsTable;