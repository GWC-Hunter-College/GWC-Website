import React from "react";
import "./Initiatives.css";

// Images
import InitiativesImage from "/initiatives_image.png";
import CurvyArrow from "/curvy-arrow.png";

const Initiatives: React.FC = () => {
  return (
    <>
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
