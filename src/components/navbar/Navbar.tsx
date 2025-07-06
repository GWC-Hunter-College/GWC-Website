
import React from "react";
import Logo from "../logo.png";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-wrapper">
      <img src={Logo} alt="GWC Logo" />
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/initiatives">Initiatives</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/membership">Membership</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
