import Button from "../../components/button/Button";
import HeroBrand, { type HeroBrandMode } from "../../components/hero/HeroBrand";
import PageHero from "../../components/page-hero/PageHero";
import styles from "./HomeHero.module.css";

export type HomeHeroVersion = "version-1-static" | "version-2-motion";

type HomeHeroProps = {
  version: HomeHeroVersion;
  onJoin: () => void;
  onLearnMore: () => void;
};

const heroVersions: Record<
  HomeHeroVersion,
  { brandMode: HeroBrandMode; motionEnabled: boolean }
> = {
  "version-1-static": {
    brandMode: "static",
    motionEnabled: false,
  },
  "version-2-motion": {
    brandMode: "static",
    motionEnabled: true,
  },
};

const HomeHero = ({ version, onJoin, onLearnMore }: HomeHeroProps) => {
  const { brandMode, motionEnabled } = heroVersions[version];

  return (
    <PageHero
      className={styles.hero}
      data-hero-version={version}
      data-motion={motionEnabled}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.brandEntrance}>
            <HeroBrand mode={brandMode} animateLines={motionEnabled} />
          </div>
          <div className={styles.joinAction}>
            <Button variant="light" onClick={onJoin}>
              Join us
            </Button>
          </div>
        </div>

        <button
          className={styles.scrollCue}
          type="button"
          aria-controls="about"
          onClick={onLearnMore}
        >
          <span>Scroll to learn more</span>
          <span className={styles.scrollArrow} aria-hidden="true">↓</span>
        </button>
      </div>
    </PageHero>
  );
};

export default HomeHero;
