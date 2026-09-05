import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import AnimatedHeroBrand from "./AnimatedHeroBrand";
import { resolveHeroBrandVariant, type HeroBrandMode } from "./heroBrandMode";
import StaticHeroBrand from "./StaticHeroBrand";
import styles from "./HeroBrand.module.css";

export type { HeroBrandMode } from "./heroBrandMode";

type HeroBrandProps = {
  mode: HeroBrandMode;
  animateLines?: boolean;
};

const HeroBrand = ({ mode, animateLines = false }: HeroBrandProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variant = resolveHeroBrandVariant(mode, prefersReducedMotion);

  return (
    <div className={styles.frame} data-brand-variant={variant}>
      {variant === "static" ? (
        <StaticHeroBrand animateLines={animateLines} />
      ) : (
        <AnimatedHeroBrand />
      )}
    </div>
  );
};

export default HeroBrand;
