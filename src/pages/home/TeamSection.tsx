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

const hasText = (value: string | null | undefined): value is string => Boolean(value?.trim());

const normalizeSocialUrl = (value: string | null | undefined) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return undefined;
  }

  try {
    const url = new URL(trimmedValue);

    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
};

const MemberCard = ({ member, announceChanges = false, cardRef }: MemberCardProps) => {
  const metadata = [
    { label: "Role", value: member.role },
    { label: "Major", value: member.major },
    { label: "Year", value: member.year },
    { label: "Tenure", value: member.tenure },
  ];
  const linkedinUrl = normalizeSocialUrl(member.linkedinUrl);
  const discordUrl = normalizeSocialUrl(member.discordUrl);
  const socialLinks = [
    ...(linkedinUrl ? [{ label: "LinkedIn", url: linkedinUrl, icon: LinkedInDark }] : []),
    ...(discordUrl ? [{ label: "Discord", url: discordUrl, icon: DiscordDark }] : []),
  ];

  return (
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
        {metadata.map(({ label, value }) => (
          hasText(value) ? (
            <div key={label}>
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </div>
          ) : null
        ))}
      </dl>
      {hasText(member.quote) && <blockquote>“{member.quote}”</blockquote>}
      {socialLinks.length > 0 && (
        <div className={styles.cardSocials}>
          {socialLinks.map(({ label, url, icon }) => (
            <a
              className={styles.cardSocialLink}
              href={url}
              key={label}
              aria-label={`${member.name} on ${label} (opens in a new tab)`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={icon} alt="" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

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
            {hasText(member.year) && (
              <span className={styles.memberSummary}>{member.year}</span>
            )}
          </button>
        ))}
        <button
          className={styles.pastLeadershipButton}
          type="button"
          aria-expanded={pastLeadershipOpen}
          aria-controls={PAST_LEADERSHIP_ID}
          onClick={() => setPastLeadershipOpen((isOpen) => !isOpen)}
        >
          <span className={styles.pastLeadershipIcon} aria-hidden="true" />
          <span className={styles.pastLeadershipLabel}>Previous E-Board Members</span>
        </button>
      </div>

      <section
        className={styles.pastLeadershipPanel}
        id={PAST_LEADERSHIP_ID}
        aria-labelledby={PAST_LEADERSHIP_HEADING_ID}
        aria-hidden={!pastLeadershipOpen}
        data-open={pastLeadershipOpen}
        inert={!pastLeadershipOpen}
      >
        <div className={styles.pastLeadershipClip}>
          <div className={styles.pastLeadership}>
            <h3 id={PAST_LEADERSHIP_HEADING_ID}>Previous E-Board Members</h3>
            {pastMembers.length === 0 ? (
              <p className={styles.pastLeadershipEmpty}>
                No previous E-board member profiles are currently available.
              </p>
            ) : (
              <div className={styles.pastMemberList}>
                {pastMembers.map((member) => (
                  <div className={styles.pastMemberProfile} key={member.image}>
                    <PolaroidFrame
                      className={styles.pastMemberPhoto}
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      caption={member.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default TeamSection;
