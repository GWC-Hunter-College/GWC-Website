import React from "react";
import Button from "../../components/button/Button";
import "./Events.css";

const Events: React.FC = () => {
  return (
    <>
      <div className="events-background"></div>
      <div className="purple-overlay"></div>

      <section className="events-hero">
        <div className="events-text-wrapper">
          <h1 className="events-title"><em>CURRENT EVENT</em></h1>
          <p className="events-subtitle">TIME AND DATE</p>
          <Button className="rsvp-button"><em>RSVP</em></Button>
        </div>
      </section>
    </>
  );
};

export default Events;
