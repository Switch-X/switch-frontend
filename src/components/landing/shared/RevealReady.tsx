"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Switches reveal-on-scroll on for the page. Renders nothing.
 *
 * <p>The `.reveal` hidden state is scoped to `[data-reveal-ready]`, so until this runs every
 * section is simply visible. That is the difference between a page that degrades to plain HTML
 * and one that degrades to a blank column - which is what happens when the hidden state is the
 * default and the script that undoes it fails to load.
 *
 * <p>Mounted beside the landing gate rather than inside it, so the switch is already on by the
 * time the sections appear - they arrive hidden and animate in, instead of flashing into view
 * and then being hidden again.
 */
export function RevealReady() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    document.documentElement.setAttribute("data-reveal-ready", "");
    return () => document.documentElement.removeAttribute("data-reveal-ready");
  }, []);

  return null;
}
