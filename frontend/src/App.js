import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilterForm from './components/FilterForm';
import RecommendationsTable from './components/RecommendationsTable';
import { fetchOptions, fetchRecommendations } from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import About from './pages/About'
import './App.css';

// Home Component
function Home({ filters, options, recommendations, handleFilterChange, handleSubmit, handleResetRecommendations }) {
  return (
    <div className="App">
      <h1>Car Recommendations</h1>
      <FilterForm
        filters={filters}
        options={options}
        onFilterChange={handleFilterChange}
        onSubmit={handleSubmit}
        onResetRecommendations={handleResetRecommendations}
        showResetRecommendations={recommendations.length > 0}
      />
      <RecommendationsTable recommendations={recommendations} />
    </div>
  );
}

function App() {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    bodyType: '',
    seatingCapacity: '',
    fuelType: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [options, setOptions] = useState({
    brands: [],
    transmissions: [],
    bodyTypes: [],
    fuelTypes: [],
  });

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error loading options:', error);
      }
    };
    loadOptions();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchedRecommendations = await fetchRecommendations(filters);
      setRecommendations(fetchedRecommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleResetRecommendations = () => {
    setRecommendations([]);
  };

  return (
    <Router>
      <Header /> {/* Header will remain visible across all pages */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              filters={filters}
              options={options}
              recommendations={recommendations}
              handleFilterChange={handleFilterChange}
              handleSubmit={handleSubmit}
              handleResetRecommendations={handleResetRecommendations}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;