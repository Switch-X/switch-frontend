/** The badge, the headline and the pitch. */
export function HeroIntro() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 py-1.5 pr-3.5 pl-1.5 text-xs font-medium backdrop-blur">
        <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
          New
        </span>
        <span className="text-white/70">Interview rounds, questions and quiet hours — all tracked</span>
      </span>

      <h1 className="mt-7 font-display text-[3rem] leading-[1.02] font-extrabold tracking-tight text-balance text-white sm:text-[4.25rem] xl:text-[4.75rem]">
        Your job search,
        <br />
        <span className="text-gradient">kept straight.</span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
        Applications go quiet. Recruiters call once and never again. The assignment with a
        Friday deadline is in an email you have already scrolled past.{" "}
        <span className="font-medium text-white">SWITCH keeps all of it in one place</span> —
        and tells you what needs you today.
      </p>
    </>
  );
}
