"use client";

/**
 * A form's fields held as one object, with a typed setter for a single field.
 *
 * <p>Keeping the fields together is what lets every form be built from a record - and turned back
 * into a request - by a plain function in its section's `*.utils.ts`, rather than threading a
 * dozen `useState` pairs through the component.
 */

import { useCallback, useState } from "react";

/**
 * A form's fields held as one object, with a typed setter for a single field.
 *
 * <p>Keeping the fields together is what lets every form be built from a record - and turned back
 * into a request - by a plain function in its page's `utils/`, rather than threading a dozen
 * `useState` pairs through the component.
 */
export function useFormFields<T extends object>(initial: T | (() => T)) {
  const [form, setForm] = useState<T>(initial);

  const set = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  }, []);

  return [form, set] as const;
}
