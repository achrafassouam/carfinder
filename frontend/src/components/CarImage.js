import React from 'react';

const CarImage = ({ bodyType }) => {
  const imageUrl = `/images/generic/${bodyType.toLowerCase()}.jpg`;
  
  return (
    <img 
      src={imageUrl} 
      alt={`${bodyType} car`} 
      onError={(e) => {
        e.target.onerror = null; 
        e.target.src = '/images/generic/default.jpg';
      }}
    />
  );
};

export default CarImage;
