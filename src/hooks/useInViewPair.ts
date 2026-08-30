import { useEffect, useRef, useState } from "react";

type UseInViewPairOptions = {
  rootMargin?: string;
  threshold?: number;
};

const useInViewPair = <ElementType extends Element>({
  rootMargin = "0px",
  threshold = 1,
}: UseInViewPairOptions = {}) => {
  const firstRef = useRef<ElementType>(null);
  const secondRef = useRef<ElementType>(null);
  const [visibility, setVisibility] = useState<readonly [boolean, boolean]>([false, false]);

  useEffect(() => {
    const firstElement = firstRef.current;
    const secondElement = secondRef.current;

    if (!firstElement || !secondElement) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setVisibility([true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibility((currentVisibility) => {
          const nextVisibility: [boolean, boolean] = [...currentVisibility];

          entries.forEach((entry) => {
            const index = entry.target === firstElement ? 0 : 1;
            nextVisibility[index] = entry.isIntersecting && entry.intersectionRatio >= threshold;
          });

          return nextVisibility[0] === currentVisibility[0] &&
            nextVisibility[1] === currentVisibility[1]
            ? currentVisibility
            : nextVisibility;
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(firstElement);
    observer.observe(secondElement);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return {
    firstRef,
    secondRef,
    firstVisible: visibility[0],
    secondVisible: visibility[1],
  };
};

export default useInViewPair;
