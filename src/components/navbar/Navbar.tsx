
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Sparkle from "../../assets/shared/sparkle.png";
import Logo from "/logo.png";
import styles from "./Navbar.module.css";

const navigation = [
  { label: "home", to: "/" },
  { label: "initiatives", to: "/initiatives" },
  { label: "events", to: "/events" },
  { label: "membership", to: "/membership" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <Link className={styles.logoLink} to="/" aria-label="Girls Who Code at Hunter College home">
        <img className={styles.logo} src={Logo} alt="" />
      </Link>

      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="site-navigation"
        className={`${styles.navigation} ${isOpen ? styles.navigationOpen : ""}`}
        aria-label="Primary navigation"
      >
        <ul className={styles.navigationList}>
          {navigation.map((item) => (
            <li className={styles.navigationItem} key={item.to}>
              <img className={styles.sparkle} src={Sparkle} alt="" aria-hidden="true" />
              <NavLink
                className={({ isActive }) =>
                  `${styles.navigationLink} ${isActive ? styles.navigationLinkActive : ""}`
                }
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.finalSparkle} aria-hidden="true">
            <img className={styles.sparkle} src={Sparkle} alt="" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
