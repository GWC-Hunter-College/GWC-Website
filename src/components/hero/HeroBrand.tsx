import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import AnimatedHeroBrand from "./AnimatedHeroBrand";
import { resolveHeroBrandVariant, type HeroBrandMode } from "./heroBrandMode";
import StaticHeroBrand from "./StaticHeroBrand";
import styles from "./HeroBrand.module.css";

export type { HeroBrandMode } from "./heroBrandMode";

type HeroBrandProps = {
  mode: HeroBrandMode;
};

const HeroBrand = ({ mode }: HeroBrandProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const variant = resolveHeroBrandVariant(mode, prefersReducedMotion);

  return (
    <div className={styles.frame} data-brand-variant={variant}>
      {variant === "static" ? <StaticHeroBrand /> : <AnimatedHeroBrand />}
    </div>
  );
};

export default HeroBrand;
