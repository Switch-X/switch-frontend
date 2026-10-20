"use client";

/**
 * Saving a create-or-edit form, with the three pieces of state every one of them needs.
 *
 * <p>Five forms did this identically: clear the errors, mark busy, write, toast, close, and on
 * failure split an `ApiError` into its per-field map from anything else. Five copies of one rule
 * is five chances for one to drift, and the quietest one matters most - forget `setBusy(false)`
 * in the catch and the save button stays disabled with nothing on screen to explain it.
 *
 * <p>`busy` deliberately stays true after a success. The dialog is closing; re-enabling the
 * button on the way out only invites a second submit of something already saved.
 */

import { useState, type FormEvent } from "react";
import { ApiError } from "@/lib/api";

type SaveForm = {
  busy: boolean;
  error: string | null;
  /** Field name to message, as the backend rejected them. Empty for every other kind of failure. */
  fieldErrors: Record<string, string>;
  submit: (event: FormEvent) => void;
};

export function useSaveForm({
  save,
  saved,
  offline,
  onSaved,
  onClose,
}: {
  /** Does the write. Whether that is a create or an update is the caller's business. */
  save: () => Promise<unknown>;
  /** The toast once it is written. */
  saved: string;
  /** Shown when the request never got an answer at all. */
  offline: string;
  onSaved: (message: string) => void;
  onClose: () => void;
}): SaveForm {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    setBusy(true);

    try {
      await save();
      onSaved(saved);
      onClose();
    } catch (failure) {
      if (failure instanceof ApiError) {
        setFieldErrors(failure.fieldErrors);
        setError(failure.message);
      } else {
        setError(offline);
      }
      setBusy(false);
    }
  }

  return { busy, error, fieldErrors, submit };
}
