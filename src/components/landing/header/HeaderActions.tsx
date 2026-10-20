"use client";

import { Button } from "@/components/ui/button/Button";
import { useAuthDialog } from "@/components/landing/context/AuthDialogProvider";

/** Sign in and create account - drawn for the dark hero until the header turns solid. */
export function HeaderActions({ scrolled }: { scrolled: boolean }) {
  const { open } = useAuthDialog();

  return (
    <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
      {scrolled ? (
        <Button variant="ghost" size="sm" onClick={() => open("signin")}>
          Sign in
        </Button>
      ) : (
        <button
          type="button"
          onClick={() => open("signin")}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Sign in
        </button>
      )}
      <Button variant={scrolled ? "primary" : "inverse"} size="sm" onClick={() => open("signup")}>
        Create account
      </Button>
    </div>
  );
}
