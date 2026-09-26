"use client";

/**
 * A list page's filters, held as one object keyed like the API query it feeds.
 *
 * <p>Keyed like the query so the object can be handed to `api.*.list` as it is, and so "is
 * anything filtered?" is answered by comparing against where the filters started - rather than by
 * a hand-written chain of `!== null` checks that drifts the day a filter is added.
 *
 * <p>`onChange` runs on every change, clearing included. The applications list uses it to go back
 * to page one: staying on page 4 while narrowing to a filter with six results shows an empty
 * table and looks like a bug.
 */

import { useState } from "react";

export type ListFilters<T> = {
  filters: T;
  setFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  clearFilters: () => void;
  /** True when any filter differs from where it started. */
  filtered: boolean;
};

export function useListFilters<T extends Record<string, unknown>>(
  initial: T,
  onChange?: () => void,
): ListFilters<T> {
  const [filters, setFilters] = useState<T>(initial);

  function setFilter<K extends keyof T>(key: K, value: T[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    onChange?.();
  }

  function clearFilters() {
    setFilters(initial);
    onChange?.();
  }

  const filtered = (Object.keys(initial) as (keyof T)[]).some(
    (key) => filters[key] !== initial[key],
  );

  return { filters, setFilter, clearFilters, filtered };
}
