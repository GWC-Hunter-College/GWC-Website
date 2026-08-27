import React from "react";
import DecorativeArrow from "../../components/decorative-arrow/DecorativeArrow";
import "./Membership.css";

// Images
import MembersImage from "/members-image.png";

const Membership: React.FC = () => {
  return (
    <section className="members-hero">
      <img src={MembersImage} alt="Membership Character" className="memhero-character left"/>
      <div className="members-hero-text right-slant">
        <h1 className="mem-hero-title">MEMBERS</h1>
        <div className="memhero-subtitle-wrapper">
          <p className="memhero-subtitle"><i>Become a member of Girls Who<br></br>Code @ Hunter College to receive<br></br>exclusive community benefits!</i></p>
        </div>
        <DecorativeArrow className="hero-arrow" />
      </div>
    </section>
  );
};

export default Membership;
