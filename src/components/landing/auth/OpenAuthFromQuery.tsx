"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthDialog } from "@/components/landing/context/AuthDialogProvider";

/**
 * Opens the auth dialog when the page is reached with `?create=1` or `?signin=...`.
 *
 * <p>Three places send people here that way, and all three need the form open rather than a page
 * to scroll:
 *
 * <ul>
 *   <li>`?create=1` - the app shell, when a session holds an id with no profile behind it.</li>
 *   <li>`?signin=1` - `endSession` in `lib/api.ts`, after a 401 ended the session.</li>
 *   <li>`?signin=failed` - the gateway, when a sign-in did not complete.</li>
 * </ul>
 *
 * <p>A component of its own because `useSearchParams` needs a Suspense boundary above it for the
 * page to prerender, and this way that boundary wraps one effect rather than the whole page.
 * Renders nothing.
 */
export function OpenAuthFromQuery() {
  const params = useSearchParams();
  const { open } = useAuthDialog();

  useEffect(() => {
    if (params.get("create")) {
      open("signup");
      return;
    }
    if (params.get("signin")) open("signin");
  }, [params, open]);

  return null;
}
