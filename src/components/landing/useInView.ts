"use client";

import { useEffect, useRef, useState } from "react";

/** True from the moment the element has been scrolled into view. Drives the counters. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(element);

    // Same failsafe as Reveal: a counter stuck at zero reads as "we have nothing", which is
    // worse than a counter that skipped its animation.
    const failsafe = window.setTimeout(() => {
      setInView(true);
      observer.disconnect();
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [inView]);

  return [ref, inView] as const;
}
