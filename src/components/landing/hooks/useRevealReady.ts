"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/components/landing/utils/motion";

/**
 * Marks the document once JavaScript is running.
 *
 * <p>The `.reveal` hidden state is scoped to `[data-reveal-ready]`, so until this runs every
 * section is simply visible. That is the difference between a page that degrades to plain HTML
 * and one that degrades to a blank column - which is what happens when the hidden state is the
 * default and the script that undoes it fails to load.
 */
export function useRevealReady() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    document.documentElement.setAttribute("data-reveal-ready", "");
    return () => document.documentElement.removeAttribute("data-reveal-ready");
  }, []);
}
