"use client";

/**
 * Sign in, or create the profile to sign in with.
 *
 * <p>Both tabs end the same way: with an access token from Keycloak, which `session.tsx` keeps
 * and every later call carries. Signing in really is signing in - the password is checked by
 * Keycloak and the token is verified by the backend on every request.
 */

import { useEffect, useState } from "react";
import type { AuthMode } from "@/components/landing/auth/authDialog.types";
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
