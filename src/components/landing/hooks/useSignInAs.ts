"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/session";
import { signInErrorMessage } from "@/components/landing/utils/auth";

/**
 * Signing in as a given account id, with the busy and error state its buttons need.
 *
 * <p>Shared by the hero's demo chips and the sign-in dialog, which differ only in what they say
 * when the id has no profile behind it - `missingProfile` builds that sentence.
 */
export function useSignInAs(missingProfile: (id: string) => string) {
  const { signIn } = useSession();
  const router = useRouter();
  /** The id being signed in as, so only that button spins. */
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signInAs(id: string) {
    if (!id.trim()) {
      setError("Enter an account id, or pick one of the demo accounts above.");
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      await signIn(id);
      router.push("/dashboard");
    } catch (failure) {
      setError(signInErrorMessage(failure, missingProfile(id.trim())));
      setBusyId(null);
    }
  }

  return { busyId, error, signInAs };
}
