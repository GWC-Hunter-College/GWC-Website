import React from "react";
import "./Initiatives.css";
import Navbar from "../../components/navbar/Navbar";
import InitiativesImage from "/initiatives_image.png";
import Hero from "../../components/hero/Hero";
import CurvyArrow from "/curvy-arrow.png";

const Initiatives: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="initiatives-hero">
        <div className="hero-text-wrapper">
          <h1 className="in-hero-title">INITIATIVES</h1>
          <p className="inhero-subtitle"><i>Student-led programs to foster<br></br>community and bring opportunities to<br></br>members!</i></p>
          <img src={CurvyArrow} alt="Curvy Arrow" className="hero-arrow" />
        </div>
        <img src={InitiativesImage} alt="Initiatives Character" className="inhero-character" />
      </section>
    </>
  );
};

export default Initiatives;
