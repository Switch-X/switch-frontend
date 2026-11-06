"use client";

import { Button } from "@/components/ui/button/Button";
import { gatewayApi } from "@/components/landing/auth/gateway.api";

/** Sign in and create account - drawn for the dark hero until the header turns solid. */
export function HeaderActions({ scrolled }: { scrolled: boolean }) {
  const signIn = () => {
    window.location.href = gatewayApi.loginUrl("/dashboard");
  };
  const register = () => {
    window.location.href = gatewayApi.registerUrl("/dashboard");
  };

  return (
    <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
      {scrolled ? (
        <Button variant="ghost" size="sm" onClick={signIn}>
          Sign in
        </Button>
      ) : (
        <button
          type="button"
          onClick={signIn}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          Sign in
        </button>
      )}
      <Button variant={scrolled ? "primary" : "inverse"} size="sm" onClick={register}>
        Create account
      </Button>
    </div>
  );
}
