"use client";

/**
 * Asks why, then deletes.
 *
 * <p>Asked, never required. Every box can be left empty and the button still works - making
 * somebody justify themselves before they can leave would be a dark pattern, and the answer
 * would be worthless anyway.
 *
 * <p>The confirmation lives here rather than in `ConfirmDialog` because there is a form in the
 * middle of it now. What it keeps from that component is the shape: the destructive action is
 * the one on the right, and it says what it will do rather than "OK".
 */

import { useState } from "react";
import { cx } from "@/lib/cx";
import { Button } from "@/components/ui/button/Button";
import { Checkbox } from "@/components/ui/form/Checkbox";
import { ErrorNote } from "@/components/ui/feedback/ErrorNote";
import { Field } from "@/components/ui/form/Field";
import { Modal } from "@/components/ui/overlay/Modal";
import { Textarea } from "@/components/ui/form/Textarea";
import { DELETE_REASONS } from "./deleteAccount.constants";

export function DeleteAccountDialog({
  open,
  busy,
  error,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  busy: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: (reasons: string[], note: string) => void;
}) {
  const [reasons, setReasons] = useState<string[]>([]);
  const [note, setNote] = useState("");

  function toggle(reason: string, checked: boolean) {
    setReasons((current) =>
      checked ? [...current, reason] : current.filter((one) => one !== reason),
    );
  }

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete your account?"
      description="Every application, interview, take-home and screening call goes with it. This cannot be undone."
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-ink">
            Before you go — why are you deleting it?
          </p>
          <p className="mt-0.5 text-xs text-ink-subtle">
            Optional. Tick anything that applies, or none of it.
          </p>

          <div className="mt-3 space-y-2">
            {DELETE_REASONS.map((reason) => (
              <Checkbox
                key={reason}
                id={`delete-reason-${reason}`}
                label={reason}
                checked={reasons.includes(reason)}
                onChange={(checked) => toggle(reason, checked)}
              />
            ))}
          </div>
        </div>

        <Field label="Anything else" htmlFor="delete-note">
          <Textarea
            id="delete-note"
            rows={3}
            value={note}
            placeholder="What would have made you stay?"
            onChange={(event) => setNote(event.target.value)}
          />
        </Field>

        {error && <ErrorNote>{error}</ErrorNote>}

        <div
          className={cx(
            "flex flex-wrap items-center justify-end gap-3 border-t border-border pt-5",
          )}
        >
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Keep my account
          </Button>
          <Button variant="danger" loading={busy} onClick={() => onConfirm(reasons, note)}>
            Delete everything
          </Button>
        </div>
      </div>
    </Modal>
  );
}
