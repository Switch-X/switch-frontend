"use client";

/**
 * Sign in or create an account, in a dialog rather than in the hero.
 *
 * <p>A tall form sitting beside the headline is the layout that makes a product page look like a
 * login screen with marketing copy attached, and it costs the first screen the space the product
 * shot needs. What stays in the open is the button that opens it: **Create account** in the
 * hero, the header and the closing call to action.
 */

import { Modal } from "@/components/ui/overlay/Modal";
import { AUTH_DIALOG_COPY } from "@/components/landing/auth/authDialog.constants";
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
      size={mode === "signup" ? "md" : "sm"}
    >
      <AuthCard initialTab={mode ?? "signin"} />
    </Modal>
  );
}
