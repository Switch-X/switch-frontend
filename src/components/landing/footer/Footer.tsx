/**
 * The page footer.
 *
 * <p>Three jobs, in order of how much they matter: give somebody who scrolled the whole way a
 * second chance to start, say plainly what this is and who made it, and leave the page on
 * something that looks finished rather than a horizontal rule with a copyright under it.
 *
 * <p>A server component. The sign-up button and the local clock are its only islands.
 */

import { FooterBottomBar } from "./FooterBottomBar";
import { FooterBrand } from "./FooterBrand";
import { FooterDecor } from "./FooterDecor";
import { FooterLinkColumns } from "./FooterLinkColumns";
import { FooterPipeline } from "./FooterPipeline";

export function Footer() {
  return (
    <footer className="relative mt-4 overflow-hidden border-t border-border bg-surface">
      <FooterDecor />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8 lg:gap-14">
          <FooterBrand />
          <FooterLinkColumns />
        </div>

        <FooterPipeline />
        <FooterBottomBar />
      </div>
    </footer>
  );
}
