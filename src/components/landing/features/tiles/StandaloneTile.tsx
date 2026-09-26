import { Icon } from "@/components/ui/icons";
import { TileHeading } from "../TileHeading";

export function StandaloneTile() {
  return (
    <TileHeading icon={Icon.Link} title="Not everything has an application">
      A recruiter cold-calling you has no application behind it. Screening calls, interviews
      and assignments can all stand alone — and be linked later, once it becomes real.
    </TileHeading>
  );
}
