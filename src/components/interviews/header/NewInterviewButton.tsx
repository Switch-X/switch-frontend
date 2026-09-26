"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useInterviews } from "@/components/interviews/context/InterviewsProvider";

export function NewInterviewButton() {
  const { editor } = useInterviews();

  return (
    <Button onClick={editor.create}>
      <Icon.Plus className="size-4" />
      New interview
    </Button>
  );
}
