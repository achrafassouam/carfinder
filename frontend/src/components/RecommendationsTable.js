import React from 'react';

const RecommendationsTable = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  console.log('Backend URL:', BASE_URL); // This will help us verify the URL in the console

  if (!BASE_URL) {
    console.error('Backend URL is not set. Please check your .env file.');
    return <div>Error: Backend URL is not set</div>;
  }

  const carTypeImages = {
    sedan: `${BASE_URL}/images/generic/sedan.jpg`,
    suv: `${BASE_URL}/images/generic/suv.jpg`,
    convertible: `${BASE_URL}/images/generic/convertible.jpg`,
    coupe: `${BASE_URL}/images/generic/coupe.jpg`,
    hatchback: `${BASE_URL}/images/generic/hatchback.jpg`,
    van: `${BASE_URL}/images/generic/van.jpg`,
    truck: `${BASE_URL}/images/generic/truck.jpg`,
    default: `${BASE_URL}/images/generic/default.jpg`,
  };

  return (
    <div className="recommendations">
      <h2>Recommendations:</h2>
      <div className="car-grid">
        {recommendations.map((car, index) => {
          const bodyType = (car.bodyType || '').toLowerCase();
          const imageUrl = carTypeImages[bodyType] || carTypeImages.default;
          console.log(`Car ${index + 1} - Body Type: ${bodyType}, Image URL: ${imageUrl}`);

          return (
            <div key={index} className="car-card">
              <img
                src={imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
                onError={(e) => {
                  console.error(`Error loading image for ${car.brand} ${car.model}:`, e);
                  e.target.src = carTypeImages.default; // Fallback image
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
