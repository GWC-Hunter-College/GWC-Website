import styles from "./PolaroidFrame.module.css";

type PolaroidFrameProps = {
  src: string;
  alt: string;
  className?: string;
};

const PolaroidFrame = ({ src, alt, className }: PolaroidFrameProps) => (
  <figure className={[styles.frame, className].filter(Boolean).join(" ")}>
    <img className={styles.image} src={src} alt={alt} decoding="async" />
  </figure>
);

export default PolaroidFrame;
