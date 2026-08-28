/*
import DecorativeArrow from "../../components/decorative-arrow/DecorativeArrow";
import PageHero from "../../components/page-hero/PageHero";
import InitiativesImage from "/initiatives_image.png";
import InitiativeCard from "./InitiativeCard";
import { initiativeCategories, initiatives } from "./initiativesData";
import styles from "./Initiatives.module.css";

const Initiatives = () => {
  return (
    <div className={styles.page}>
      <PageHero className={styles.pageHero} aria-labelledby="initiatives-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle} id="initiatives-title">
              Initiatives
            </h1>
            <p className={styles.heroDescription}>
              Student-led programs to foster community and bring opportunities to our members!
            </p>
            <DecorativeArrow className={styles.heroArrow} />
          </div>

          <img className={styles.heroCharacter} src={InitiativesImage} alt="" aria-hidden="true" />
        </div>
      </PageHero>

      <section className={styles.directory} aria-labelledby="initiatives-directory-title">
        <div className={styles.directoryInner}>
          <h2 className={styles.visuallyHidden} id="initiatives-directory-title">
            Current initiatives
          </h2>

          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Filter by:</span>
            <ul className={styles.filterList}>
              {initiativeCategories.map((category) => (
                <li className={styles.filterChip} key={category}>
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <ul className={styles.cardGrid}>
            {initiatives.map((initiative) => (
              <InitiativeCard initiative={initiative} key={initiative.title} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
*/

import PageHero from "../../components/page-hero/PageHero";
import styles from "./Initiatives.module.css";

const Initiatives = () => {
  return (
    <div className={styles.workInProgressPage}>
      <PageHero className={styles.workInProgressHero} aria-labelledby="initiatives-title">
        <div className={styles.workInProgressContent}>
          <p className={styles.workInProgressLabel}>Initiatives</p>
          <h1 id="initiatives-title">Work in progress</h1>
          <p>We’re building this page now. Check back soon to see what we’re working on!</p>
        </div>
      </PageHero>
    </div>
  );
};

export default Initiatives;
