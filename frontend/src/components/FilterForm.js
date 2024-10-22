import React from 'react';

const FilterForm = ({ filters, options, onFilterChange, onSubmit, onResetRecommendations, showResetRecommendations }) => {
  return (
    <form className="filter-form" onSubmit={onSubmit}>
      <h2>Find Your Perfect Car</h2>
      <div className="filter-form-grid">
        <div>
          <label htmlFor="brand">Brand</label>
          <select
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={onFilterChange}
          >
            <option value="">Select Brand</option>
            {options.brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={onFilterChange}
            placeholder="Min Price"
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={onFilterChange}
            placeholder="Max Price"
          />
        </div>
        <div>
          <label htmlFor="transmission">Transmission</label>
          <select
            id="transmission"
            name="transmission"
            value={filters.transmission}
            onChange={onFilterChange}
          >
            <option value="">Select Transmission</option>
            {options.transmissions.map((transmission) => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bodyType">Body Type</label>
          <select
            id="bodyType"
            name="bodyType"
            value={filters.bodyType}
            onChange={onFilterChange}
          >
            <option value="">Select Body Type</option>
            {options.bodyTypes.map((bodyType) => (
              <option key={bodyType} value={bodyType}>{bodyType}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="seatingCapacity">Seating Capacity</label>
          <input
            type="number"
            id="seatingCapacity"
            name="seatingCapacity"
            value={filters.seatingCapacity}
            onChange={onFilterChange}
            placeholder="Seating Capacity"
          />
        </div>
        <div>
          <label htmlFor="fuelType">Fuel Type</label>
          <select
            id="fuelType"
            name="fuelType"
            value={filters.fuelType}
            onChange={onFilterChange}
          >
            <option value="">Select Fuel Type</option>
            {options.fuelTypes.map((fuelType) => (
              <option key={fuelType} value={fuelType}>{fuelType}</option>
            ))}
          </select>
        </div>
        {showResetRecommendations && (
            <button type="button" onClick={onResetRecommendations} className="reset-recommendations-button">
              Reset Recommendations
            </button>
          )}
      </div>
      <button type="submit" className="submit-button">Find Cars</button>
    </form>
  );
};

export default FilterForm;
