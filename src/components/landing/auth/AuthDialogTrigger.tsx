"use client";

import type { ReactNode } from "react";
import type { AuthMode } from "@/components/landing/auth/authDialog.types";
import { useAuthDialog } from "@/components/landing/context/AuthDialogProvider";

/**
 * A button that opens the auth dialog - the one piece of the hero, the closing call to action
 * and the footer that needs the browser. Styled entirely by its caller, so a server component
 * can drop it in with `buttonClass(...)` or its own classes and keep everything around it static.
 */
export function AuthDialogTrigger({
  mode,
  className,
  children,
}: {
  mode: AuthMode;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useAuthDialog();

  return (
    <button type="button" onClick={() => open(mode)} className={className}>
      {children}
    </button>
  );
}
