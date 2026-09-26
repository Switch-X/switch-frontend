import { Icon } from "@/components/ui/icons";
import { TileHeading } from "../TileHeading";

export function QuietHoursTile() {
  return (
    <>
      <TileHeading icon={Icon.Globe} title="Your hours, your city">
        Set the hours you would rather not be disturbed. They stay fixed to the time of day
        where you live, so they still hold when the clocks change or you travel.
      </TileHeading>

      <div className="mt-5 rounded-lg bg-ink px-3 py-2.5 text-[11px] text-white/80">
        <span className="text-white/40">Quiet from</span>{" "}
        <span className="text-white">22:00 until 07:00</span>
        <br />
        <span className="text-white/40">Where you are</span>{" "}
        <span className="text-white">Mumbai</span>
      </div>
    </>
  );
}
