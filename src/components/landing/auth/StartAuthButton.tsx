"use client";

import type { ReactNode } from "react";
import { gatewayApi } from "@/components/landing/auth/gateway.api";

/** Leaves for Keycloak - its sign-in page or its register page. Nothing opens in between. */
export function StartAuthButton({
  mode,
  className,
  children,
}: {
  mode: "signin" | "signup";
  className?: string;
  children: ReactNode;
}) {
  function go() {
    window.location.href =
      mode === "signup" ? gatewayApi.registerUrl("/dashboard") : gatewayApi.loginUrl("/dashboard");
  }

  return (
    <button type="button" onClick={go} className={className}>
      {children}
    </button>
  );
}
