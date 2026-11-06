/**
 * The landing page.
 *
 * <p>A server component, and almost all of this page is copy and layout that renders here and
 * ships no JavaScript. The pieces that need the browser are islands inside their own sections
 * under `components/landing/` - the header's scroll state, the sign-in dialog, the preview and
 * journey timers, the live clocks, the counters and spotlights, and the auth dialog.
 *
 * <p>Anyone already holding a session is sent straight to the dashboard by `LandingGate` rather
 * than shown a "sign in" button they do not need. Sign-in itself lives in a dialog, opened from
 * the header, the hero, the closing call to action and the footer.
 */

import { FaqSection } from "@/components/landing/faq/FaqSection";
import { FeaturesSection } from "@/components/landing/features/FeaturesSection";
import { FinalCta } from "@/components/landing/final-cta/FinalCta";
import { Footer } from "@/components/landing/footer/Footer";
import { LandingHeader } from "@/components/landing/header/LandingHeader";
import { Hero } from "@/components/landing/hero/Hero";
import { JourneySection } from "@/components/landing/journey/JourneySection";
import { WorkflowSection } from "@/components/landing/workflow/WorkflowSection";
import { Marquee } from "@/components/landing/marquee/Marquee";
import { LandingGate } from "@/components/landing/shared/LandingGate";
import { RevealReady } from "@/components/landing/shared/RevealReady";
import { NeedsYouSection } from "@/components/landing/needs-you/NeedsYouSection";
import { TimezonesSection } from "@/components/landing/world-clocks/TimezonesSection";

export default function LandingPage() {
  return (
    <>
      <RevealReady />

      <LandingGate>
          <main>
            <LandingHeader />
            <Hero />
            <Marquee />
            <NeedsYouSection />
            <JourneySection />
            <WorkflowSection />
            <TimezonesSection />
            <FeaturesSection />
            <FaqSection />
            <FinalCta />
            <Footer />

          </main>
      </LandingGate>
    </>
  );
}
