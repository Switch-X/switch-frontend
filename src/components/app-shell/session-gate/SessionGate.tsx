"use client";

/**
 * Decides whether a signed-in screen renders at all.
 *
 * <p>Three states have to be told apart here, because two of them look like "not signed in" and
 * need completely different screens. `loading` is the gap before the browser has read
 * localStorage - rendering the sign-in page during it would flash the landing screen at someone
 * who is already signed in, on every refresh. `signed-out` goes to the landing page.
 * `no-profile` is an id with no row behind it, which is a dead end the user cannot navigate out
 * of, so it gets an explicit way back rather than a redirect loop.
 */

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { FullPageSpinner } from "@/components/ui/FullPageSpinner";
import { NoProfileScreen } from "./NoProfileScreen";

export function SessionGate({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "signed-out") router.replace("/");
  }, [status, router]);

  if (status === "loading" || status === "signed-out") return <FullPageSpinner />;
  if (status === "no-profile") return <NoProfileScreen />;

  return <>{children}</>;
}
