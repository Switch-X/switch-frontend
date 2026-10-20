"use client";

import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icons";
import { useScreeningCalls } from "@/components/screening-calls/context/ScreeningCallsProvider";

export function LogCallButton() {
  const { editor } = useScreeningCalls();

  return (
    <Button onClick={editor.create}>
      <Icon.Plus className="size-4" />
      Log a call
    </Button>
  );
}
