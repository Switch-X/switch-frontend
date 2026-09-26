"use client";

import { useRevealReady } from "@/components/landing/hooks/useRevealReady";

/**
 * Switches reveal-on-scroll on for the page. Renders nothing.
 *
 * <p>Mounted beside the landing gate rather than inside it, so the switch is already on by the
 * time the sections appear - they arrive hidden and animate in, instead of flashing into view and
 * then being hidden again.
 */
export function RevealReady() {
  useRevealReady();
  return null;
}
