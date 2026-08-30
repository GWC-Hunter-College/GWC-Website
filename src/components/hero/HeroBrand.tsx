import { useSyncExternalStore } from "react";
import AnimatedHeroBrand from "./AnimatedHeroBrand";
import { resolveHeroBrandVariant, type HeroBrandMode } from "./heroBrandMode";
import StaticHeroBrand from "./StaticHeroBrand";
import styles from "./HeroBrand.module.css";

export type { HeroBrandMode } from "./heroBrandMode";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const getReducedMotionSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotionSnapshot = () => false;

type HeroBrandProps = {
  mode: HeroBrandMode;
};

const HeroBrand = ({ mode }: HeroBrandProps) => {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
  const variant = resolveHeroBrandVariant(mode, prefersReducedMotion);

  return (
    <div className={styles.frame} data-brand-variant={variant}>
      {variant === "static" ? <StaticHeroBrand /> : <AnimatedHeroBrand />}
    </div>
  );
};

export default HeroBrand;
