import { Icon } from "@/components/ui/icons";
import { TileHeading } from "../TileHeading";

export function SampleDataTile() {
  return (
    <TileHeading icon={Icon.Sparkle} title="Start with a worked example">
      One click fills a new account with twelve applications covering every status, four
      interviews and their rounds, plus assignments and screening calls — all dated around
      today, so the deadlines actually mean something.
    </TileHeading>
  );
}
