import { useEffect, useRef, useState } from "react";

type UseInViewOnceOptions = {
  rootMargin?: string;
  threshold?: number;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useInViewOnce = <ElementType extends Element>({
  rootMargin = "0px",
  threshold = 0.25,
}: UseInViewOnceOptions = {}) => {
  const elementRef = useRef<ElementType>(null);
  const [hasEntered, setHasEntered] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasEntered) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasEntered(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasEntered, rootMargin, threshold]);

  return { elementRef, hasEntered };
};

export default useInViewOnce;
