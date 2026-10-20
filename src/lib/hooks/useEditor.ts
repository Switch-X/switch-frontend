"use client";

/**
 * The open/closed state of a create-or-edit dialog.
 *
 * <p>Every one of these screens needs the same bit of state and always spells it slightly
 * differently, so it is spelled once here.
 */

import { useCallback, useState } from "react";

/**
 * The open/closed state of a create-or-edit dialog.
 *
 * `editing` is null when the dialog is creating and holds the record when it is editing, which
 * is the one bit of state every one of these screens needs and always spells slightly differently.
 */
export type Editor<T> = {
  open: boolean;
  editing: T | null;
  create: () => void;
  edit: (record: T) => void;
  close: () => void;
};

export function useEditor<T>(): Editor<T> {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);

  const create = useCallback(() => {
    setEditing(null);
    setOpen(true);
  }, []);

  const edit = useCallback((record: T) => {
    setEditing(record);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { open, editing, create, edit, close };
}
