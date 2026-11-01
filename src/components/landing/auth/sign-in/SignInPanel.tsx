"use client";

import { useState } from "react";

import { gatewayApi } from "@/components/landing/auth/gateway.api";
import { writeAuthMode } from "@/lib/authMode";
import { Button } from "@/components/ui/button/Button";

/**
 * Sign in.
 *
 * <p>There is no password field here, and that is the point: this app never sees the password.
 * The browser goes to Keycloak, signs in there, and comes back to the gateway, which keeps the
 * tokens and hands this browser nothing but a cookie it cannot read. A script that ends up on
 * this page has nothing to steal.
 *
 * <p>A full navigation rather than a fetch. Keycloak's sign-in page has to be reached as a
 * top-level navigation or it cannot do its job - no password field, no MFA step, and no chance to
 * notice the reader already has a session and wave them straight through. A fetch would return
 * the HTML and nothing would happen.
 *
 * <p>The mode is written *before* leaving, because after the redirect this app is loaded fresh
 * and has no memory of what was clicked. It is the only thing that survives the trip on this
 * side; everything that matters survives on the gateway's side, in Redis.
 *
 * <p>No loading state that ever clears. The page is on its way out - a spinner that resolves
 * would be a lie, and leaving the button pressable invites a second flow that abandons the
 * first one's state in Redis for five minutes.
 */
export function SignInPanel({ onSwitch }: { onSwitch: () => void }) {
  const [leaving, setLeaving] = useState(false);

  function start() {
    setLeaving(true);
    writeAuthMode("session");
    window.location.href = gatewayApi.loginUrl("/dashboard");
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Pick up where you left off</h2>
        <p className="mt-1 text-sm text-ink-muted">
          You will sign in on a page of your own, then come straight back here.
        </p>
      </div>

      <Button className="w-full" loading={leaving} onClick={start}>
        Sign in
      </Button>

      <p className="text-center text-xs text-ink-subtle">
        Your password is never typed into this app, and no sign-in token is kept in this browser.
      </p>

      <p className="text-center text-sm text-ink-muted">
        No account yet?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-brand hover:underline">
          Create one
        </button>
      </p>
    </div>
  );
}
