import TeamCharacter from "../../assets/home/team-character.png";
import styles from "./FutureThreeDPlaceholder.module.css";

const FutureThreeDPlaceholder = () => {
  return (
    <div className={styles.placeholder} data-future-3d-slot>
      <img src={TeamCharacter} alt="Bunny mascot placeholder" />
      <p>Interactive 3D artwork coming soon</p>
    </div>
  );
};

export default FutureThreeDPlaceholder;
