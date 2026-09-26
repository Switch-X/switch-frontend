"use client";

/**
 * Sign in or create an account, in a dialog rather than in the hero.
 *
 * <p>A tall form sitting beside the headline is the layout that makes a product page look like a
 * login screen with marketing copy attached, and it costs the first screen the space the product
 * shot needs. The one thing worth keeping in the open is the fast path - the demo chips in the
 * hero still sign you in with one click.
 */

import { Modal } from "@/components/ui/Modal";
import { AUTH_DIALOG_COPY } from "@/components/landing/constants/auth";
import { useAuthDialog } from "@/components/landing/context/AuthDialogProvider";
import { AuthCard } from "./AuthCard";

export function AuthDialog() {
  const { mode, close } = useAuthDialog();
  const copy = AUTH_DIALOG_COPY[mode ?? "signin"];

  return (
    <Modal
      open={mode !== null}
      onClose={close}
      title={copy.title}
      description={copy.description}
      size="sm"
    >
      <AuthCard initialTab={mode ?? "signin"} />
    </Modal>
  );
}
