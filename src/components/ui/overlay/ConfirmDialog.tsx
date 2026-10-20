import type { ReactNode } from "react";
import { Button } from "@/components/ui/button/Button";
import { Modal } from "./Modal";

/**
 * Deletes in this app cascade - removing an application takes its interviews, assignments and
 * screening calls with it - so the confirmation says what else goes rather than asking a bare
 * "are you sure?".
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  busy = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-ink-muted">{message}</p>
    </Modal>
  );
}
