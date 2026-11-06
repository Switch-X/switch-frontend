"use client";

import { useSession } from "@/lib/session";
import { Logo } from "@/components/ui/brand/Logo";
import { ProfileSetupPanel } from "@/components/landing/auth/sign-up/ProfileSetupPanel";

/**
 * Signed in, with no profile behind it yet.
 *
 * <p>Where every new account lands: Keycloak has just made the login and sent the browser back,
 * and the profile is the half it did not ask for. It is also where somebody returns if they
 * abandoned this screen last time - the login is real either way, so the way out is to finish,
 * not to sign up again.
 *
 * <p>Laid out as the third page in the sign-up run, so it carries the same paper canvas, the
 * same card and the same brand column as Keycloak's register and sign-in pages. Nothing about
 * the journey should look like it changed hands halfway through, even though it did.
 */
export function NoProfileScreen() {
  const { signOut } = useSession();

  return (
    <div className="relative min-h-screen bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(760px circle at 10% 0%, rgb(91 47 232 / 0.10), transparent 62%)",
            "radial-gradient(700px circle at 95% 6%, rgb(192 38 211 / 0.08), transparent 62%)",
            "linear-gradient(var(--color-border) 1px, transparent 1px)",
            "linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "auto, auto, 72px 72px, 72px 72px",
        }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-[78rem] items-center gap-12 px-6 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
        <div className="rounded-card border border-border bg-surface p-7 shadow-[0_18px_44px_rgb(25_21_19/0.07)] sm:p-10">
          <ProfileSetupPanel />
        </div>

        <aside className="order-first lg:order-none">
          <Logo size="lg" />
          <h1 className="mt-7 font-display text-3xl font-bold tracking-tight text-ink">
            Finish setting up
          </h1>
          <p className="mt-3 max-w-md text-lg leading-relaxed text-ink-muted">
            Your login is ready. Two more questions and the dashboard is yours.
          </p>
          <p className="mt-8 text-sm text-ink-muted">
            Wrong account?{" "}
            <button
              type="button"
              onClick={signOut}
              className="font-medium text-brand hover:underline"
            >
              Sign out
            </button>
          </p>
        </aside>
      </div>
    </div>
  );
}
