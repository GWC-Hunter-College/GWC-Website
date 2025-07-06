
import React from "react";
import Logo from "../logo.png";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-wrapper">
      <img src={Logo} alt="GWC Logo" />
      <nav className="navbar">
        <ul>
          <li>✦</li>
          <li><a href="/">home</a></li>
          <li>✦</li>
          <li><a href="/initiatives">initiatives</a></li>
          <li>✦</li>
          <li><a href="/events">events</a></li>
          <li>✦</li>
          <li><a href="/membership">membership</a></li>
          <li>✦</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
