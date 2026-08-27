import { useState } from "react";
import DiscordDark from "../../assets/home/discord-dark.png";
import LinkedInDark from "../../assets/home/linkedin-dark.png";
import TeamCharacter from "../../assets/home/team-character.png";
import { teamMembers } from "./teamMembers";
import styles from "./TeamSection.module.css";

const TeamSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedMember = teamMembers[selectedIndex];

  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <h2 id="team-heading">Meet the team</h2>

      <div className={styles.featuredArea}>
        <img className={styles.character} src={TeamCharacter} alt="Club team mascot" />
        <article className={styles.memberCard} aria-live="polite">
          <div className={styles.cardBar} aria-hidden="true">
            <span />
            <span />
          </div>
          <dl>
            <div>
              <dt>Name:</dt>
              <dd>{selectedMember.name}</dd>
            </div>
            <div>
              <dt>Major:</dt>
              <dd>{selectedMember.major}</dd>
            </div>
            <div>
              <dt>Year:</dt>
              <dd>{selectedMember.year}</dd>
            </div>
          </dl>
          <blockquote>“{selectedMember.quote}”</blockquote>
          <div className={styles.cardSocials} aria-label="Member social profiles">
            <img src={LinkedInDark} alt="LinkedIn" />
            <img src={DiscordDark} alt="Discord" />
          </div>
        </article>
      </div>

      <p className={styles.prompt}>Select a member to learn more</p>
      <div className={styles.memberGrid}>
        {teamMembers.map((member, index) => (
          <button
            className={`${styles.memberButton} ${index === selectedIndex ? styles.memberButtonActive : ""}`}
            type="button"
            key={member.image}
            aria-label={`View ${member.name}’s profile`}
            aria-pressed={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={member.image} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
