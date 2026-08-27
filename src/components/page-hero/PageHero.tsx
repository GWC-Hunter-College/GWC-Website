import type { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./PageHero.module.css";

type PageHeroProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const PageHero = ({ children, className = "", ...props }: PageHeroProps) => {
  return (
    <section className={`${styles.hero} ${className}`} {...props}>
      {children}
    </section>
  );
};

export default PageHero;
