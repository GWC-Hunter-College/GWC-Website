/*
import Button from "../../components/button/Button";
import { featuredEvent } from "./eventsData";
import styles from "./Events.module.css";

const Events = () => {
  const hasRsvpDestination = featuredEvent.rsvpUrl !== null;

  const handleRsvp = () => {
    if (featuredEvent.rsvpUrl) {
      window.location.assign(featuredEvent.rsvpUrl);
    }
  };

  return (
    <div className={styles.eventsPage}>
      <section className={styles.hero} aria-labelledby="events-title">
        <div className={styles.content}>
          <h1 className={styles.title} id="events-title">
            {featuredEvent.title}
          </h1>
          <p className={styles.schedule}>{featuredEvent.schedule}</p>
          <Button
            className={styles.rsvpButton}
            disabled={!hasRsvpDestination}
            onClick={handleRsvp}
            title={!hasRsvpDestination ? featuredEvent.rsvpUnavailableMessage : undefined}
            aria-label={
              hasRsvpDestination
                ? featuredEvent.rsvpLabel
                : `${featuredEvent.rsvpLabel}. ${featuredEvent.rsvpUnavailableMessage}`
            }
          >
            {featuredEvent.rsvpLabel}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Events;
*/

import PageHero from "../../components/page-hero/PageHero";
import styles from "./Events.module.css";

const Events = () => {
  return (
    <div className={styles.workInProgressPage}>
      <PageHero className={styles.workInProgressHero} aria-labelledby="events-title">
        <div className={styles.workInProgressContent}>
          <p className={styles.workInProgressLabel}>Events</p>
          <h1 id="events-title">Work in progress</h1>
          <p>We’re building this page now. Check back soon to see what’s coming up!</p>
        </div>
      </PageHero>
    </div>
  );
};

export default Events;
