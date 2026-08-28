import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CollageCenter from "../../assets/home/collage-center.jpg";
import CollageLeft from "../../assets/home/collage-left.jpg";
import CollageRight from "../../assets/home/collage-right.jpg";
import Button from "../../components/button/Button";
import AnimatedHeroLogo from "../../components/hero/AnimatedHeroLogo";
import PageHero from "../../components/page-hero/PageHero";
import useInViewOnce from "../../hooks/useInViewOnce";
import FutureThreeDPlaceholder from "./FutureThreeDPlaceholder";
import { frequentlyAskedQuestions } from "./homeData";
import TeamSection from "./TeamSection";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef<HTMLElement>(null);
  const { elementRef: collageSectionRef, hasEntered: collageHasEntered } =
    useInViewOnce<HTMLElement>({ rootMargin: "0px 0px -8% 0px", threshold: 0.3 });

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.page}>
      <PageHero className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles.heroContent}>
          <AnimatedHeroLogo />
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
        ref={collageSectionRef}
        data-in-view={collageHasEntered}
        aria-label="Girls Who Code community photos"
      >
        <div className={styles.sectionDivider} aria-hidden="true" />
        <div className={styles.photoGroup}>
          <figure className={styles.photoLeft}>
            <img src={CollageLeft} alt="Students attending a Girls Who Code presentation" />
          </figure>
          <figure className={styles.photoCenter}>
            <img src={CollageCenter} alt="Girls Who Code members gathering together" />
          </figure>
          <figure className={styles.photoRight}>
            <img src={CollageRight} alt="Girls Who Code members at a club event" />
          </figure>
        </div>
        <div className={styles.sectionDivider} aria-hidden="true" />
      </section>

      <TeamSection />

      <section className={styles.faq} aria-labelledby="faq-heading">
        <h2 id="faq-heading">FAQ</h2>
        <div className={styles.faqList}>
          {frequentlyAskedQuestions.map((item) => (
            <details className={styles.faqItem} key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
