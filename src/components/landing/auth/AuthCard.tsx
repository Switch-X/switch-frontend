"use client";

/**
 * Sign in, or create the profile to sign in with.
 *
 * <p>Worth being plain about what "sign in" means here, because the screen would otherwise imply
 * something the backend does not do. `HeaderCurrentUser` reads `X-User-Id` off the request and
 * trusts it; there is no password to check and no token to verify. So this is an account
 * chooser, and painting a password box on it would be a lie that also teaches the wrong habit.
 */

import { useEffect, useState } from "react";
import type { AuthMode } from "@/components/landing/types/auth";
import { AuthTabs } from "./AuthTabs";
import { SignInPanel } from "./sign-in/SignInPanel";
import { SignUpPanel } from "./sign-up/SignUpPanel";

export function AuthCard({ initialTab = "signin" }: { initialTab?: AuthMode }) {
  const [tab, setTab] = useState<AuthMode>(initialTab);

  // Re-syncs when the caller opens the dialog on a different tab than last time.
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  return (
    <>
      <AuthTabs active={tab} onSelect={setTab} />
      <div className="pt-5">
        {tab === "signin" ? <SignInPanel onSwitch={() => setTab("signup")} /> : <SignUpPanel />}
      </div>
    </>
  );
}
