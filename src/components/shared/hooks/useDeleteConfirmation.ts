"use client";

/**
 * The state behind every "Delete this ...?" dialog: which record is waiting on confirmation,
 * whether the delete is running, and the toast either way.
 *
 * <p>A failed delete is reported and the dialog stays open, so the reader can try again or back
 * out rather than wonder whether it went through.
 */

import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/Toast";

export type DeleteConfirmation<T> = {
  /** The record the dialog is asking about, or null while it is closed. */
  pending: T | null;
  busy: boolean;
  request: (record: T) => void;
  cancel: () => void;
  confirm: () => Promise<void>;
};

export function useDeleteConfirmation<T>({
  remove,
  deleted,
  failed,
  onDeleted,
}: {
  remove: (record: T) => Promise<unknown>;
  /** The toast once it has gone. */
  deleted: string;
  /** The toast when it has not. */
  failed: string;
  onDeleted: () => void;
}): DeleteConfirmation<T> {
  const toast = useToast();
  const [pending, setPending] = useState<T | null>(null);
  const [busy, setBusy] = useState(false);

  const request = useCallback((record: T) => setPending(record), []);
  const cancel = useCallback(() => setPending(null), []);

  async function confirm() {
    if (!pending) return;
    setBusy(true);
    try {
      await remove(pending);
      toast(deleted);
      setPending(null);
      onDeleted();
    } catch {
      toast(failed, "info");
    } finally {
      setBusy(false);
    }
  }

  return { pending, busy, request, cancel, confirm };
}
