/*
import { useState, type FormEvent } from "react";
import Button from "../../components/button/Button";
import DecorativeArrow from "../../components/decorative-arrow/DecorativeArrow";
import PageHero from "../../components/page-hero/PageHero";
import MembersImage from "/members-image.png";
import styles from "./Membership.module.css";

const interestOptions = ["Career", "Community", "Volunteer"] as const;

const Membership = () => {
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmation(
      "Thanks for your interest! This frontend form is not connected to submissions yet.",
    );
  };

  return (
    <div className={styles.page}>
      <PageHero className={styles.hero}>
        <div className={styles.heroInner}>
          <img
            src={MembersImage}
            alt="Girls Who Code member character"
            className={styles.heroCharacter}
          />
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>Members</h1>
            <p className={styles.heroSubtitle}>
              Become a member of Girls Who Code @ Hunter College to receive exclusive community
              benefits!
            </p>
            <DecorativeArrow className={styles.heroArrow} />
          </div>
        </div>
      </PageHero>

      <section className={styles.formSection} aria-labelledby="membership-form-heading">
        <div className={styles.formContainer}>
          <h2 id="membership-form-heading" className={styles.visuallyHidden}>
            Membership form
          </h2>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onChange={() => setConfirmation("")}
          >
            <div className={styles.fieldGrid}>
              <label className={styles.field} htmlFor="membership-first-name">
                <span>First Name*</span>
                <input
                  id="membership-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                />
              </label>

              <label className={styles.field} htmlFor="membership-last-name">
                <span>Last Name*</span>
                <input
                  id="membership-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                />
              </label>

              <label
                className={`${styles.field} ${styles.fieldFull}`}
                htmlFor="membership-email"
              >
                <span>
                  Email* <small>(for communication)</small>
                </span>
                <input
                  id="membership-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className={styles.field} htmlFor="membership-emplid">
                <span>EMPLID*</span>
                <input
                  id="membership-emplid"
                  name="emplid"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                />
              </label>

              <label
                className={`${styles.field} ${styles.fieldFull}`}
                htmlFor="membership-major"
              >
                <span>Major*</span>
                <input
                  id="membership-major"
                  name="major"
                  type="text"
                  autoComplete="off"
                  required
                />
              </label>

              <label className={styles.field} htmlFor="membership-year">
                <span>Year*</span>
                <select id="membership-year" name="year" defaultValue="" required>
                  <option value="" disabled>
                    Select your year
                  </option>
                  <option value="freshman">Freshman</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                  <option value="graduate">Graduate</option>
                </select>
              </label>
            </div>

            <fieldset className={styles.interests}>
              <legend>Interests</legend>
              <div className={styles.interestOptions}>
                {interestOptions.map((interest) => (
                  <label className={styles.interestOption} key={interest}>
                    <input type="checkbox" name="interests" value={interest.toLowerCase()} />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className={`${styles.field} ${styles.comments}`} htmlFor="membership-comments">
              <span>Additional Comments</span>
              <textarea id="membership-comments" name="comments" rows={6} />
            </label>

            <div className={styles.submitArea}>
              <Button className={styles.submitButton} type="submit" variant="light">
                Join
              </Button>
              <p className={styles.confirmation} aria-live="polite">
                {confirmation}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Membership;
*/

import PageHero from "../../components/page-hero/PageHero";
import styles from "./Membership.module.css";

const Membership = () => {
  return (
    <div className={styles.workInProgressPage}>
      <PageHero className={styles.workInProgressHero} aria-labelledby="membership-title">
        <div className={styles.workInProgressContent}>
          <p className={styles.workInProgressLabel}>Membership</p>
          <h1 id="membership-title">Work in progress</h1>
          <p>We’re building this page now. Check back soon to become a member!</p>
        </div>
      </PageHero>
    </div>
  );
};

export default Membership;
