"use client";

/**
 * Fades and lifts its children into view once, the first time they are scrolled to.
 *
 * <p>Hand-rolled on `IntersectionObserver` rather than an animation library - this page needs two
 * effects, and the smallest such library is larger than the rest of its script put together.
 * `children` can be server-rendered: only the wrapper that moves runs in the browser.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Staggers siblings. Kept small - a list whose last item takes most of a second reads as slow. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "header";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shown) return;

    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once only: re-hiding a section when it scrolls back off the top is the effect that
        // makes long pages feel twitchy.
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // A little before it reaches the viewport, so the motion is finishing as it arrives
      // rather than starting.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(element);

    /**
     * The safety net, and the reason this is not just an observer.
     *
     * <p>Hiding content and waiting for a callback to bring it back means any case where that
     * callback does not arrive leaves the section invisible *permanently* - not late, gone. That
     * happens more often than it sounds: a viewport resized past the element without a scroll, a
     * tall element whose intersection ratio never reaches the threshold, a print or screenshot
     * pass, a browser that throttles observers in a background tab.
     *
     * <p>So the element reveals itself after a beat regardless. Anything actually scrolled to
     * animates properly; anything the observer missed simply appears. A page that fails to
     * animate is a small disappointment. A page with a hole in it is a bug.
     */
    const failsafe = window.setTimeout(() => {
      setShown(true);
      observer.disconnect();
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [shown]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? "reveal-in" : ""} ${className ?? ""}`}
      style={shown && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
