"use client";

/**
 * Loading a list, with the three states that actually happen.
 *
 * <p>Every list screen needs the same thing - fetch on mount, refetch when a filter changes,
 * refetch after a write - and each one writing its own `useEffect` is how a UI ends up showing a
 * spinner forever on one page and a stale list on another.
 *
 * <p>The part worth keeping is the staleness guard. Change two filters quickly and two requests
 * are in flight; if the first one finishes last, its result overwrites the newer one and the
 * table shows rows that do not match the controls above it. Each run takes a sequence number and
 * a result is dropped unless it belongs to the newest one.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/errorMessages";

export type Resource<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** Re-runs the loader - call it after a create, update or delete. */
  reload: () => void;
};

export function useResource<T>(loader: () => Promise<T>, deps: unknown[]): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const latest = useRef(0);
  // Held in a ref so a loader defined inline in a component body - a new function identity on
  // every render - does not retrigger the effect forever.
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    const run = ++latest.current;
    setLoading(true);

    loaderRef
      .current()
      .then((result) => {
        if (run !== latest.current) return;
        setData(result);
        setError(null);
      })
      .catch((failure: unknown) => {
        if (run !== latest.current) return;
        setError(failure instanceof ApiError ? failure.message : ERROR_MESSAGES.offline);
      })
      .finally(() => {
        if (run !== latest.current) return;
        setLoading(false);
      });
    // The loader is read from a ref, so the caller's dependency list is the whole trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((value) => value + 1), []);

  return { data, loading, error, reload };
}
