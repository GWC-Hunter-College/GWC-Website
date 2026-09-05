import type { Initiative } from "./initiativesData";
import styles from "./Initiatives.module.css";

type InitiativeCardProps = {
  initiative: Initiative;
};

const InitiativeCard = ({ initiative }: InitiativeCardProps) => {
  return (
    <li className={styles.cardItem}>
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>{initiative.title}</h3>

        <div className={styles.artworkArea}>
          <img className={styles.cardArtwork} src={initiative.image} alt={initiative.imageAlt} />
        </div>

        <div className={styles.cardFooter}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {initiative.status}
          </p>
          <span className={styles.cardArrow} aria-hidden="true">
            →
          </span>
        </div>
      </article>
    </li>
  );
};

export default InitiativeCard;
