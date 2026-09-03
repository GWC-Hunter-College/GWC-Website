import { useRef, useState, type Ref } from "react";
import DiscordDark from "../../assets/home/discord-dark.png";
import LinkedInDark from "../../assets/home/linkedin-dark.png";
import PolaroidFrame from "../../components/polaroid-frame/PolaroidFrame";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { currentMembers, pastMembers, type TeamMember } from "./teamMembers";
import styles from "./TeamSection.module.css";

const PAST_LEADERSHIP_ID = "past-leadership";
const PAST_LEADERSHIP_HEADING_ID = "past-leadership-heading";

type MemberCardProps = {
  member: TeamMember;
  announceChanges?: boolean;
  cardRef?: Ref<HTMLElement>;
};

const MemberCard = ({ member, announceChanges = false, cardRef }: MemberCardProps) => (
  <article
    className={styles.memberCard}
    aria-live={announceChanges ? "polite" : undefined}
    ref={cardRef}
  >
    <div className={styles.cardBar} aria-hidden="true">
      <span />
      <span />
    </div>
    <dl>
      <div>
        <dt>Name:</dt>
        <dd>{member.name}</dd>
      </div>
      <div>
        <dt>Major:</dt>
        <dd>{member.major}</dd>
      </div>
      <div>
        <dt>Year:</dt>
        <dd>{member.year}</dd>
      </div>
    </dl>
    <blockquote>“{member.quote}”</blockquote>
    <div className={styles.cardSocials} aria-label="Member social profiles">
      <img src={LinkedInDark} alt="LinkedIn" />
      <img src={DiscordDark} alt="Discord" />
    </div>
  </article>
);

const TeamSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pastLeadershipOpen, setPastLeadershipOpen] = useState(false);
  const featuredCardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const selectedMember = currentMembers[selectedIndex];

  const selectMember = (index: number, revealDetails: boolean) => {
    setSelectedIndex(index);

    if (!revealDetails || !window.matchMedia("(max-width: 800px)").matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      featuredCardRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "center",
      });
    });
  };

  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <h2 id="team-heading">Meet the team</h2>

      <div className={styles.featuredArea}>
        <PolaroidFrame
          className={styles.selectedPhoto}
          src={selectedMember.image}
          alt={`Portrait of ${selectedMember.name}`}
        />
        <MemberCard member={selectedMember} announceChanges cardRef={featuredCardRef} />
      </div>

      <p className={styles.prompt}>Select a member to learn more</p>
      <div className={styles.memberGrid}>
        {currentMembers.map((member, index) => (
          <button
            className={`${styles.memberButton} ${index === selectedIndex ? styles.memberButtonActive : ""}`}
            type="button"
            key={member.image}
            aria-label={`View ${member.name}’s profile`}
            aria-pressed={index === selectedIndex}
            onClick={(event) => selectMember(index, event.detail > 0)}
          >
            <img src={member.image} alt="" />
            <span className={styles.memberName}>{member.name}</span>
            <span className={styles.memberSummary}>{member.year}</span>
          </button>
        ))}
        <button
          className={styles.pastLeadershipButton}
          type="button"
          aria-expanded={pastLeadershipOpen}
          aria-controls={PAST_LEADERSHIP_ID}
          onClick={() => setPastLeadershipOpen((isOpen) => !isOpen)}
        >
          <span className={styles.pastLeadershipIcon} aria-hidden="true">
            {pastLeadershipOpen ? "−" : "+"}
          </span>
          <span>Past Leadership</span>
        </button>
      </div>

      <section
        className={styles.pastLeadership}
        id={PAST_LEADERSHIP_ID}
        aria-labelledby={PAST_LEADERSHIP_HEADING_ID}
        hidden={!pastLeadershipOpen}
      >
        <h3 id={PAST_LEADERSHIP_HEADING_ID}>Past Leadership</h3>
        {pastMembers.length === 0 ? (
          <p className={styles.pastLeadershipEmpty}>
            No past leadership profiles are currently available.
          </p>
        ) : (
          <div className={styles.pastMemberList}>
            {pastMembers.map((member) => (
              <div className={styles.featuredArea} key={member.image}>
                <PolaroidFrame
                  className={styles.selectedPhoto}
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                />
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default TeamSection;
