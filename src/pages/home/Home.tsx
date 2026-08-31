import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CollageCenter from "../../assets/home/collage-center.jpg";
import CollageLeft from "../../assets/home/collage-left.jpg";
import CollageRight from "../../assets/home/collage-right.jpg";
import Button from "../../components/button/Button";
import HeroBrand, { type HeroBrandMode } from "../../components/hero/HeroBrand";
import PageHero from "../../components/page-hero/PageHero";
import useInViewPair from "../../hooks/useInViewPair";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import FaqItem from "./FaqItem";
import FutureThreeDPlaceholder from "./FutureThreeDPlaceholder";
import { frequentlyAskedQuestions } from "./homeData";
import TeamSection from "./TeamSection";
import styles from "./Home.module.css";

const HERO_BRAND_MODE: HeroBrandMode = "static";
const POLAROID_OPEN_DELAY_MS = 50;
const POLAROID_CLOSE_DELAY_MS = 250;

const Home = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [polaroidsOpen, setPolaroidsOpen] = useState(false);
  const [polaroidHovered, setPolaroidHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    firstRef: topBarRef,
    secondRef: bottomBarRef,
    firstVisible: topBarVisible,
    secondVisible: bottomBarVisible,
  } = useInViewPair<HTMLDivElement>();
  const polaroidSectionFullyVisible = topBarVisible && bottomBarVisible;
  const shouldOpenPolaroids = polaroidSectionFullyVisible || polaroidHovered;

  useEffect(() => {
    if (prefersReducedMotion || polaroidsOpen === shouldOpenPolaroids) {
      return;
    }

    const transitionTimeout = window.setTimeout(() => {
      setPolaroidsOpen(shouldOpenPolaroids);
    }, shouldOpenPolaroids ? POLAROID_OPEN_DELAY_MS : POLAROID_CLOSE_DELAY_MS);

    return () => window.clearTimeout(transitionTimeout);
  }, [polaroidsOpen, prefersReducedMotion, shouldOpenPolaroids]);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.page}>
      <PageHero className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.heroContent}>
          <HeroBrand mode={HERO_BRAND_MODE} />
          <div className={styles.heroButtons}>
            <Button aria-controls="about" onClick={scrollToAbout}>Learn more</Button>
            <Button variant="light" onClick={() => navigate("/membership")}>Join us</Button>
          </div>
        </div>
      </PageHero>

      <section
        className={styles.about}
        id="about"
        ref={aboutSectionRef}
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading">Who are we?</h2>
        <div className={styles.aboutGrid}>
          <p>
            Girls Who Code at Hunter College is a student-led community where students can build
            technical skills, find support, and grow alongside peers who share an interest in technology.
          </p>
          <FutureThreeDPlaceholder />
          <p>
            Through workshops, career programs, community initiatives, and social events, we create
            opportunities for members to learn, collaborate, and feel at home in computing.
          </p>
        </div>
      </section>

      <section
        className={styles.collage}
        data-in-view={prefersReducedMotion || polaroidsOpen}
        aria-label="Girls Who Code community photos"
      >
        <div className={styles.sectionDivider} ref={topBarRef} aria-hidden="true" />
        <div className={styles.photoGroup} onMouseLeave={() => setPolaroidHovered(false)}>
          <figure
            className={styles.photoLeft}
            onMouseEnter={() => setPolaroidHovered(true)}
          >
            <img src={CollageLeft} alt="Students attending a Girls Who Code presentation" />
          </figure>
          <figure
            className={styles.photoCenter}
            onMouseEnter={() => setPolaroidHovered(true)}
          >
            <img src={CollageCenter} alt="Girls Who Code members gathering together" />
          </figure>
          <figure
            className={styles.photoRight}
            onMouseEnter={() => setPolaroidHovered(true)}
          >
            <img src={CollageRight} alt="Girls Who Code members at a club event" />
          </figure>
        </div>
        <div className={styles.sectionDivider} ref={bottomBarRef} aria-hidden="true" />
      </section>

      <TeamSection />

      <section className={styles.faq} aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        <div className={styles.faqList}>
          {frequentlyAskedQuestions.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openFaqIndex === index}
              onOpenChange={(isOpen) => setOpenFaqIndex(isOpen ? index : null)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
