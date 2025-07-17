import React from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <section className="home-hero">
        <div className="home-text-wrapper">
          <div className="hero-title-wrapper">
            <h1 className="home-title">
              <span className="bold-italic">GIRLS</span> 
              <span className="italic">WHO</span>
            </h1>
            <div className="home-code-row">
              <div className="home-line"></div>
              <h1 className="home-title code-word">
                <span className="bold-italic">CODE</span>
              </h1>
              <div className="home-line"></div>
            </div>
          </div>
          <p className="hero-subtitle"><em>hunter college</em></p>
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-dark"><em>LOG IN</em></button>
            <button className="hero-btn hero-btn-light"><em>JOIN US</em></button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;