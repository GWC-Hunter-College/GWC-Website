import styles from "./PolaroidFrame.module.css";

type PolaroidFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

const PolaroidFrame = ({ src, alt, caption, className }: PolaroidFrameProps) => {
  const visibleCaption = caption?.trim();

  return (
    <figure
      className={[styles.frame, visibleCaption && styles.frameWithCaption, className]
        .filter(Boolean)
        .join(" ")}
    >
      <img className={styles.image} src={src} alt={alt} decoding="async" />
      {visibleCaption && <figcaption className={styles.caption}>{visibleCaption}</figcaption>}
    </figure>
  );
};

export default PolaroidFrame;
