"use client";

import { usersApi } from "@/components/profile/user.api";
import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useSession } from "@/lib/session";
import { Button } from "@/components/ui/button/Button";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Icon } from "@/components/ui/icons";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

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

  async function remove(reasons: string[], note: string) {
    setBusy(true);
    setError(null);
    try {
      // Only what they actually said. An untouched form sends nothing rather than empty fields.
      await usersApi.remove({
        reasons: reasons.length > 0 ? reasons : undefined,
        note: note.trim() || undefined,
      });
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
        {/* A failure that happened with the dialog closed - it reopens with the message inside,
            so this is only for anything left over after it has been dismissed. */}
        {error && !confirming && <ErrorNote>{error}</ErrorNote>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {children}
          <Button variant="danger" onClick={() => setConfirming(true)}>
            <Icon.Trash className="size-4" />
            Delete account
          </Button>
        </div>
      </div>

      <DeleteAccountDialog
        open={confirming}
        busy={busy}
        error={error}
        onCancel={() => setConfirming(false)}
        onConfirm={remove}
      />
    </>
  );
}
