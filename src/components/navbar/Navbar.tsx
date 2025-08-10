
import React from "react";
import Logo from "/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-wrapper">
      <img src={Logo} alt="GWC Logo" />
      <nav className="navbar">
        <ul>
          <li>✦</li>
          <li><Link to="/">home</Link></li>
          <li>✦</li>
          <li><Link to="/initiatives">initiatives</Link></li>
          <li>✦</li>
          <li><Link to="/events">events</Link></li>
          <li>✦</li>
          <li><Link to="/membership">membership</Link></li>
          <li>✦</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
