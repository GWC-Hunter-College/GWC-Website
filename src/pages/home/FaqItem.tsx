import { useId, type ReactNode } from "react";
import styles from "./FaqItem.module.css";

type FaqItemProps = {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const FaqItem = ({ question, answer, isOpen, onOpenChange }: FaqItemProps) => {
  const generatedId = useId();
  const triggerId = `faq-trigger-${generatedId}`;
  const panelId = `faq-panel-${generatedId}`;

  return (
    <div className={styles.item} data-open={isOpen}>
      <h3 className={styles.heading}>
        <button
          className={styles.trigger}
          id={triggerId}
          type="button"
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={() => onOpenChange(!isOpen)}
        >
          <span className={styles.question}>{question}</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </button>
      </h3>

      <div
        className={styles.panelGrid}
        id={panelId}
        role="region"
        aria-hidden={!isOpen}
        aria-labelledby={triggerId}
        inert={!isOpen}
      >
        <div className={styles.panelInner}>
          <div className={styles.answer}>{answer}</div>
        </div>
      </div>
    </div>
  );
};

export type { FaqItemProps };
export default FaqItem;
