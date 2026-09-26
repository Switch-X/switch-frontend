"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthDialog } from "@/components/landing/context/AuthDialogProvider";

/**
 * Opens the sign-up form when the page is reached with `?create=1`.
 *
 * <p>The app shell sends people here that way when their session holds an id with no profile
 * behind it - they need the form open, not a page to scroll. A component of its own because
 * `useSearchParams` needs a Suspense boundary above it for the page to prerender, and this way
 * that boundary wraps one effect rather than the whole page. Renders nothing.
 */
export function OpenSignUpFromQuery() {
  const params = useSearchParams();
  const { open } = useAuthDialog();

  useEffect(() => {
    if (params.get("create")) open("signup");
  }, [params, open]);

  return null;
}
