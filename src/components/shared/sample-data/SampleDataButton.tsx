"use client";

/**
 * Fills the signed-in account with a realistic job search.
 *
 * <p>Confirms first, and says exactly what it is about to create. This is additive - it writes
 * new rows rather than replacing anything - so running it twice gives you two of everything.
 * That is worth saying in the dialog rather than discovering afterwards, since there is no undo
 * beyond deleting the rows by hand.
 *
 * <p>Progress is shown because it is ~40 sequential requests: a button that sits there doing
 * nothing for several seconds reads as broken.
 */

import { useState } from "react";
import { ApiError } from "@/lib/api";
import { loadSampleData, type SampleDataProgress } from "@/lib/sampleData";
import { Button } from "@/components/ui/Button";
import { ErrorNote } from "@/components/ui/ErrorNote";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Icon } from "@/components/ui/icons";
import { SampleDataChecklist } from "./SampleDataChecklist";
import { SampleDataProgressBar } from "./SampleDataProgressBar";

export function SampleDataButton({
  onLoaded,
  variant = "primary",
  size = "md",
  label = "Load sample data",
}: {
  /** Called once everything is created, so the caller can refetch. */
  onLoaded: () => void;
  variant?: "primary" | "secondary" | "subtle";
  size?: "sm" | "md";
  label?: string;
}) {
  const toast = useToast();
  const [confirming, setConfirming] = useState(false);
  const [progress, setProgress] = useState<SampleDataProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const busy = progress !== null;

  async function run() {
    setError(null);
    setProgress({ step: "Starting", done: 0, total: 1 });
    try {
      const created = await loadSampleData(setProgress);
      setConfirming(false);
      setProgress(null);
      toast(
        `Added ${created.applications} applications, ${created.interviews} interviews and ${created.rounds} rounds`,
      );
      onLoaded();
    } catch (failure) {
      // Partial data is the likely state here, and pretending otherwise would send someone
      // looking for a bug when the fix is to delete what landed and try again.
      setError(
        failure instanceof ApiError
          ? `${failure.message} Some records may already have been created.`
          : "Could not reach SWITCH. Some of the example records may already have been added.",
      );
      setProgress(null);
    }
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setConfirming(true)}>
        <Icon.Sparkle className="size-4" />
        {label}
      </Button>

      <Modal
        open={confirming}
        onClose={() => (busy ? undefined : setConfirming(false))}
        title="Load sample data?"
        description="A worked example of a job search, for this account."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirming(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={run} loading={busy}>
              {busy ? "Creating…" : "Load it"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <SampleDataChecklist />
          {progress && <SampleDataProgressBar progress={progress} />}
          {error && <ErrorNote>{error}</ErrorNote>}
        </div>
      </Modal>
    </>
  );
}
