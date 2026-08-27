import HeartImage from "../../assets/home/heart.png";
import styles from "./FutureThreeDPlaceholder.module.css";

const FutureThreeDPlaceholder = () => {
  return (
    <div className={styles.placeholder} data-future-3d-slot>
      <img src={HeartImage} alt="Faceted heart" />
      <p>Interactive 3D artwork coming soon</p>
    </div>
  );
};

export default FutureThreeDPlaceholder;
