"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ApiError, api } from "@/lib/api";
import { useSession } from "@/lib/session";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Icon } from "@/components/ui/icons";

/**
 * The delete button, its confirmation, and the error if it fails.
 *
 * <p>`children` is the explanation beside the button. It is passed in from the card, which renders
 * on the server, so only the part that acts on the account runs in the browser.
 */
export function DeleteAccountControls({ children }: { children: ReactNode }) {
  const { signOut } = useSession();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      await api.users.remove();
      setConfirming(false);
      signOut();
      router.push("/");
    } catch (failure) {
      setError(
        failure instanceof ApiError
          ? failure.message
          : "Could not reach SWITCH. Nothing was deleted.",
      );
      setBusy(false);
    }
  }

  return (
    <>
      <div className="space-y-3 p-5">
        {error && <ErrorNote>{error}</ErrorNote>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {children}
          <Button variant="danger" onClick={() => setConfirming(true)}>
            <Icon.Trash className="size-4" />
            Delete account
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirming}
        busy={busy}
        title="Delete your account?"
        confirmLabel="Delete everything"
        message="Every application, interview, assignment and screening call will be deleted along with the account. This cannot be undone."
        onCancel={() => setConfirming(false)}
        onConfirm={remove}
      />
    </>
  );
}
