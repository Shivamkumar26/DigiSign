import React from "react";
import "./navbar.css";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="navbar-logo">
        <span className="logo-text">DigiSign</span>
      </div>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
