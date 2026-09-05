import RetroSkyArtwork from "../../assets/home/retro-sky.svg";
import styles from "./RetroSkyBackground.module.css";

const RetroSkyBackground = () => {
  return (
    <div className={styles.background} aria-hidden="true">
      <img className={styles.artwork} src={RetroSkyArtwork} alt="" />
    </div>
  );
};

export default RetroSkyBackground;
