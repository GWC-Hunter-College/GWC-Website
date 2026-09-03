import { useEffect, useRef, type MouseEvent } from "react";
import styles from "./GalleryModal.module.css";

export type GalleryPhoto = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
};

type GalleryModalProps = {
  photo: GalleryPhoto | null;
  returnFocusTo?: HTMLElement | null;
  onClose: () => void;
};

const GalleryModal = ({ photo, returnFocusTo, onClose }: GalleryModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const lastPhotoRef = useRef<GalleryPhoto | null>(photo);
  const isOpen = photo !== null;

  const displayedPhoto = photo ?? lastPhotoRef.current;

  useEffect(() => {
    if (photo) {
      lastPhotoRef.current = photo;
    }
  }, [photo]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      openerRef.current = returnFocusTo ?? (
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      );
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen, returnFocusTo]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleDialogClose = () => {
    const opener = openerRef.current;
    onClose();

    window.requestAnimationFrame(() => {
      if (opener?.isConnected) {
        opener.focus();
      }
    });
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Expanded community photo"
      onClick={handleBackdropClick}
      onClose={handleDialogClose}
    >
      {displayedPhoto && (
        <figure className={styles.frame} data-orientation={displayedPhoto.orientation}>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close expanded photo"
            autoFocus
            onClick={closeDialog}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <img
            key={displayedPhoto.src}
            className={styles.image}
            src={displayedPhoto.src}
            alt={displayedPhoto.alt}
            decoding="async"
            draggable="false"
          />
        </figure>
      )}
    </dialog>
  );
};

export default GalleryModal;
