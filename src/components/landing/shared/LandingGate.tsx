"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { FullPageSpinner } from "@/components/ui/FullPageSpinner";

/**
 * Holds the page back until we know who is looking at it.
 *
 * <p>Anyone already holding a session is sent straight to the dashboard rather than shown a
 * "sign in" button they do not need - reopening the tab should land where they left off. Until
 * the browser has read the session there is no telling which case this is, so it shows a spinner
 * rather than flash the landing page at someone who is signed in.
 */
export function LandingGate({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "signed-in") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading" || status === "signed-in") return <FullPageSpinner />;

  return <>{children}</>;
}
