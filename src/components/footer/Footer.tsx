import DiscordIcon from "../../assets/shared/discord.png";
import EmailIcon from "../../assets/shared/email.png";
import InstagramIcon from "../../assets/shared/instagram.png";
import LinkedInIcon from "../../assets/shared/linkedin.png";
import Logo from "/logo.png";
import styles from "./Footer.module.css";

const socialIcons = [
  { label: "Discord", icon: DiscordIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "LinkedIn", icon: LinkedInIcon },
  { label: "Email", icon: EmailIcon },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <img className={styles.logo} src={Logo} alt="Girls Who Code at Hunter College" />
        <div className={styles.details}>
          <p className={styles.copyright}>
            Copyright © 2025 – Girls Who Code Hunter College. All Rights Reserved
          </p>
          <ul className={styles.socialList} aria-label="Girls Who Code social platforms">
            {socialIcons.map((social) => (
              <li key={social.label}>
                <img className={styles.socialIcon} src={social.icon} alt={social.label} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
