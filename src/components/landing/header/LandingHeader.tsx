"use client";

/**
 * The page header: transparent over the hero, solid once you scroll past it.
 *
 * <p>A bar that is always opaque puts a hard line across the top of the hero and cuts the
 * gradient off; one that is always transparent becomes unreadable over the content further down.
 * Switching on scroll is the usual answer because it is the correct one - and it is why this
 * section, unlike most of the page, has to be a client component.
 */

import { cx } from "@/lib/cx";
import { HEADER_SOLID_AFTER_PX } from "@/components/landing/constants/header";
import { useScrolled } from "@/components/landing/hooks/useScrolled";
import { HeaderActions } from "./HeaderActions";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderNav } from "./HeaderNav";

export function LandingHeader() {
  const scrolled = useScrolled(HEADER_SOLID_AFTER_PX);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="flex w-full items-center gap-6 px-5 py-3.5 sm:px-10 lg:px-16 xl:px-24">
        <HeaderBrand scrolled={scrolled} />
        <HeaderNav scrolled={scrolled} />
        <HeaderActions scrolled={scrolled} />
      </div>
    </header>
  );
}
