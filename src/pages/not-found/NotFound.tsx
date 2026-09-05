import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>404</p>
      <h1>Page not found</h1>
      <p>The page you’re looking for isn’t part of the club site.</p>
      <Link className={styles.link} to="/">
        Back to home
      </Link>
    </section>
  );
};

export default NotFound;
