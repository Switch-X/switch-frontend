/** The dialog's two tabs, and the heading each one opens on. */

import type { AuthMode } from "./authDialog.types";

/** The dialog's heading for each tab it can open on. */
export const AUTH_DIALOG_COPY: Record<AuthMode, { title: string; description: string }> = {
  signin: { title: "Welcome back", description: "Sign in with the email and password you registered with." },
  signup: { title: "Create your account", description: "Three short steps. Everything here can be changed later." },
};

export const AUTH_TABS: { mode: AuthMode; label: string }[] = [
  { mode: "signin", label: "Sign in" },
  { mode: "signup", label: "Create account" },
];
