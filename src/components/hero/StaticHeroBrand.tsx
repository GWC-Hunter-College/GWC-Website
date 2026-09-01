import styles from "./StaticHeroBrand.module.css";

type StaticHeroBrandProps = {
  animateLines?: boolean;
};

const StaticHeroBrand = ({ animateLines = false }: StaticHeroBrandProps) => (
  <div className={styles.brand} data-animate-lines={animateLines}>
    <h1 className={styles.heroTitle} id="home-hero-title">
      <span className={styles.titleTop}>
        <strong>Girls</strong> <span>Who</span>
      </span>
      <span className={styles.titleBottom}>Code</span>
    </h1>
    <p className={styles.heroSubtitle}>hunter college</p>
  </div>
);

export default StaticHeroBrand;
