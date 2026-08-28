import { useId, type CSSProperties } from "react";
import styles from "./AnimatedHeroLogo.module.css";

const affiliationText = "@HUNTER";
const affiliationStart = 2350;
const affiliationStep = 48;

type CharacterStyle = CSSProperties & {
  "--character-delay": string;
};

const getCharacterStyle = (delay: number): CharacterStyle => ({
  "--character-delay": `${delay}ms`,
});

/**
 * A code-driven recreation of the club mark. Keeping the lettering together in
 * one component lets the same lockup be resized for other placements later.
 */
export const GwcHunterMark = () => {
  const gradientId = useId().replace(/:/g, "");

  return (
    <span className={styles.visualLockup} aria-hidden="true">
      <svg
        className={styles.script}
        viewBox="0 0 720 225"
        focusable="false"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#bdf8ff" />
            <stop offset="0.55" stopColor="#8feaf7" />
            <stop offset="1" stopColor="#76d5eb" />
          </linearGradient>
        </defs>

        <g style={{ stroke: `url(#${gradientId})` }}>
          <path
            className={`${styles.scriptStroke} ${styles.gStroke}`}
            pathLength="100"
            d="M 45 108 C 45 84 75 75 92 88 C 108 102 95 128 74 132 C 54 136 41 121 45 104 C 50 87 74 85 92 95 C 103 102 103 122 101 141 C 98 170 86 194 63 194 C 43 194 34 182 41 171 C 49 158 75 161 101 145"
          />
          <path
            className={`${styles.scriptStroke} ${styles.iStroke}`}
            pathLength="100"
            d="M 105 145 C 112 140 116 132 116 108 C 116 119 113 129 113 135 C 113 142 120 144 128 136"
          />
          <circle className={styles.dot} cx="117" cy="84" r="5" />
          <path
            className={`${styles.scriptStroke} ${styles.rStroke}`}
            pathLength="100"
            d="M 128 136 C 137 130 141 119 142 107 L 141 135 C 145 120 154 110 164 110 C 173 110 176 117 172 123"
          />
          <path
            className={`${styles.scriptStroke} ${styles.lStroke}`}
            pathLength="100"
            d="M 172 123 C 184 114 192 98 196 78 C 201 51 197 32 188 34 C 178 36 176 58 178 82 C 180 108 187 132 202 137 C 214 141 227 134 236 124"
          />
          <path
            className={`${styles.scriptStroke} ${styles.sStroke}`}
            pathLength="100"
            d="M 279 111 C 264 101 242 109 242 122 C 242 134 256 136 268 139 C 281 142 281 152 271 157 C 259 163 242 157 235 149"
          />

          <g transform="translate(-58 0)">
            <path
              className={`${styles.scriptStroke} ${styles.wStroke}`}
              pathLength="100"
              d="M 385 108 C 387 132 395 145 407 132 L 420 105 C 417 133 425 145 438 132 L 452 104 C 449 129 455 140 467 132"
            />
            <path
              className={`${styles.scriptStroke} ${styles.hStroke}`}
              pathLength="100"
              d="M 467 132 C 480 116 489 93 494 66 C 499 40 496 27 488 29 C 479 32 477 51 478 75 L 479 137 C 487 116 501 102 515 104 C 529 106 531 119 523 129 C 518 136 521 143 531 141"
            />
            <path
              className={`${styles.scriptStroke} ${styles.oStroke}`}
              pathLength="100"
              d="M 531 141 C 544 138 551 130 555 118 C 560 103 578 100 589 107 C 602 115 600 131 590 139 C 578 148 561 143 559 130 C 557 115 572 106 590 111 C 608 116 618 129 634 128"
            />
            <path
              className={`${styles.scriptStroke} ${styles.flourishStroke}`}
              pathLength="100"
              d="M 632 128 C 664 128 693 120 718 105"
            />
          </g>
        </g>
      </svg>

      <svg
        className={styles.codeMark}
        viewBox="0 0 590 164"
        focusable="false"
        aria-hidden="true"
      >
        <path
          className={`${styles.codeLetter} ${styles.codeC}`}
          d="M 18 24 H 145 V 55 H 57 V 124 H 145 V 155 H 18 Z"
        />
        <path
          className={`${styles.codeLetter} ${styles.codeO}`}
          fillRule="evenodd"
          d="M 158 24 H 286 V 155 H 158 Z M 197 55 V 124 H 247 V 55 Z"
        />
        <path
          className={`${styles.codeLetter} ${styles.codeD}`}
          fillRule="evenodd"
          d="M 301 0 H 350 C 406 0 437 27 437 78 C 437 129 406 155 350 155 H 301 Z M 340 31 V 124 H 350 C 381 124 398 110 398 78 C 398 45 381 31 350 31 Z"
        />
        <path
          className={`${styles.codeLetter} ${styles.codeE}`}
          d="M 450 24 H 577 V 55 H 489 V 74 H 558 V 104 H 489 V 124 H 577 V 155 H 450 Z"
        />
      </svg>

      <span className={styles.affiliation}>
        {Array.from(affiliationText).map((character, index) => (
          <span
            className={styles.affiliationCharacter}
            style={getCharacterStyle(affiliationStart + index * affiliationStep)}
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ))}
        <span className={styles.cursor} />
      </span>
    </span>
  );
};

const AnimatedHeroLogo = () => (
  <h1 className={`${styles.logo} ${styles.animated}`} id="home-hero-title">
    <span className={styles.accessibleName}>Girls Who Code at Hunter College</span>
    <GwcHunterMark />
  </h1>
);

export default AnimatedHeroLogo;
