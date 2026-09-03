import { useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import { NavLink } from "react-router-dom";
import Sparkle from "../../assets/shared/sparkle.png";
import styles from "./Navbar.module.css";

const navigation = [
  { label: "home", to: "/" },
  { label: "events", to: "/events" },
  { label: "membership", to: "/membership" },
];

const DESKTOP_NAV_QUERY = "(min-width: 801px)";
const TOP_VISIBILITY_BOUNDARY = 64;
const DIRECTION_CHANGE_THRESHOLD = 10;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const interactionRef = useRef({
    hasFocus: false,
    isMenuOpen: false,
    isPointerInside: false,
  });

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY);
    let previousScrollPosition = Math.max(window.scrollY, 0);
    let travelInDirection = 0;
    let travelDirection = 0;
    let animationFrame = 0;

    const resetTravel = () => {
      travelInDirection = 0;
      travelDirection = 0;
    };

    const isInteractionActive = () => {
      const interaction = interactionRef.current;

      return interaction.hasFocus || interaction.isMenuOpen || interaction.isPointerInside;
    };

    const getScrollPosition = () => {
      const maximumScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );

      return Math.min(Math.max(window.scrollY, 0), maximumScroll);
    };

    const updateVisibility = () => {
      animationFrame = 0;

      const currentScrollPosition = getScrollPosition();
      const scrollDelta = currentScrollPosition - previousScrollPosition;
      previousScrollPosition = currentScrollPosition;

      if (!desktopQuery.matches) {
        setIsVisible(true);
        resetTravel();
        return;
      }

      if (currentScrollPosition <= TOP_VISIBILITY_BOUNDARY || isInteractionActive()) {
        setIsVisible(true);
        resetTravel();
        return;
      }

      if (scrollDelta === 0) {
        return;
      }

      const nextDirection = Math.sign(scrollDelta);

      if (nextDirection !== travelDirection) {
        travelDirection = nextDirection;
        travelInDirection = Math.abs(scrollDelta);
      } else {
        travelInDirection += Math.abs(scrollDelta);
      }

      if (travelInDirection < DIRECTION_CHANGE_THRESHOLD) {
        return;
      }

      setIsVisible(travelDirection < 0);
      travelInDirection = 0;
    };

    const handleScroll = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateVisibility);
      }
    };

    const handleBreakpointChange = () => {
      previousScrollPosition = getScrollPosition();
      resetTravel();
      setIsVisible(true);

      if (desktopQuery.matches) {
        interactionRef.current.isMenuOpen = false;
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      desktopQuery.removeEventListener("change", handleBreakpointChange);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const setMenuOpen = (open: boolean) => {
    interactionRef.current.isMenuOpen = open;
    setIsOpen(open);

    if (open) {
      setIsVisible(true);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!isOpen);
  };

  const handleFocusCapture = () => {
    interactionRef.current.hasFocus = true;
    setIsVisible(true);
  };

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      interactionRef.current.hasFocus = false;

      if (isOpen) {
        setMenuOpen(false);
      }
    }
  };

  const handleNavigation = () => {
    setMenuOpen(false);

    if (window.matchMedia("(max-width: 800px)").matches) {
      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus({ preventScroll: true });
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape" || !isOpen) {
      return;
    }

    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <div
      className={`${styles.navbar} ${!isVisible ? styles.navbarHidden : ""}`}
      onBlurCapture={handleBlurCapture}
      onFocusCapture={handleFocusCapture}
      onKeyDown={handleKeyDown}
      onPointerEnter={() => {
        interactionRef.current.isPointerInside = true;
        setIsVisible(true);
      }}
      onPointerLeave={() => {
        interactionRef.current.isPointerInside = false;
      }}
    >
      <button
        ref={menuButtonRef}
        className={styles.menuButton}
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={handleMenuToggle}
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
                onClick={handleNavigation}
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
