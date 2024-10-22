import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const fetchOptions = async () => {
  try {
    const [brands, transmissions, bodyTypes, fuelTypes] = await Promise.all([
      axios.get(`${API_URL}/brands`),
      axios.get(`${API_URL}/transmissions`),
      axios.get(`${API_URL}/bodyTypes`),
      axios.get(`${API_URL}/fuelTypes`),
    ]);
    return {
      brands: brands.data,
      transmissions: transmissions.data,
      bodyTypes: bodyTypes.data,
      fuelTypes: fuelTypes.data,
    };
  } catch (error) {
    console.error('Error fetching options:', error);
    throw error;
  }
};

export const fetchRecommendations = async (filters) => {
  try {
    const response = await axios.post(`${API_URL}/recommendations`, filters);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
