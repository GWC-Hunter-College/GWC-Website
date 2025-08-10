import React from "react";
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
          <button className="rsvp-button"><em>RSVP</em></button>
        </div>
      </section>
    </>
  );
};

export default Events;
