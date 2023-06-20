import React from "react";
import "./footer.css";
import Links from "./Links.js";

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`footer ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="footerr">
        <p className="footer-text">Made with ❣ by Shivam</p>
        <Links />
      </div>
    </footer>
  );
};

export default Footer;
