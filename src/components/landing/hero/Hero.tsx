/**
 * The first screen.
 *
 * <p>It has one job beyond looking alive: get somebody into the product without making them fill
 * in a form first. The three demo chips do that in a single click — they sign in as the seeded
 * accounts and land on a dashboard with real rows in it. Everything else on this page exists to
 * persuade the people who do not click them straight away.
 *
 * <p>A server component. The copy and the background are static; the demo chips, the sign-up
 * button and the moving preview are the islands inside it.
 */

import { DashboardPreview } from "./dashboard-preview/DashboardPreview";
import { DemoSignIn } from "./DemoSignIn";
import { HeroActions } from "./HeroActions";
import { HeroBackground } from "./HeroBackground";
import { HeroIntro } from "./HeroIntro";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-night pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      <HeroBackground />

      <div className="relative w-full px-5 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-16 xl:gap-24">
          <div>
            <HeroIntro />
            <HeroActions />
            <DemoSignIn />
          </div>

          <div className="relative lg:pl-4">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
