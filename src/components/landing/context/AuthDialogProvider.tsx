"use client";

/**
 * Which tab of the auth dialog is open, if either.
 *
 * <p>Held above the whole page because five separate places open it - the header, the hero, the
 * closing call to action, the footer and a `?create=1` link - and the sections around them render
 * on the server. Each of those buttons is a small client island that reads this.
 */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AuthMode } from "@/components/landing/types/auth";

type AuthDialogValue = {
  mode: AuthMode | null;
  open: (mode: AuthMode) => void;
  close: () => void;
};

const AuthDialogContext = createContext<AuthDialogValue | null>(null);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);

  const open = useCallback((next: AuthMode) => setMode(next), []);
  const close = useCallback(() => setMode(null), []);

  const value = useMemo(() => ({ mode, open, close }), [mode, open, close]);

  return <AuthDialogContext.Provider value={value}>{children}</AuthDialogContext.Provider>;
}

export function useAuthDialog(): AuthDialogValue {
  const value = useContext(AuthDialogContext);
  if (!value) throw new Error("useAuthDialog must be used inside <AuthDialogProvider>");
  return value;
}
