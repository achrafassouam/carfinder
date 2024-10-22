import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <span className="logo">🚗</span>
          <div className="title-container">
            <h1 className="header-title">Car Finder</h1>
            <p className="header-subtitle">Find your perfect car match</p>
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-button" onClick={() => navigate('/')}>Home</button>
          <button className="nav-button" onClick={() => navigate('/about')}>About Us</button>
          <button className="nav-button nav-button-highlight" onClick={() => navigate('/login')}>Login</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
