/**
 * The icon set, drawn inline.
 *
 * <p>A dependency for twenty glyphs would be a megabyte of tree-shaking guesswork for something
 * that fits in one file. Each one is a 24-grid stroke path, so they line up with each other and
 * inherit `currentColor` from whatever is around them.
 */

type IconProps = { className?: string };

/** Any one of the glyphs below - for data that carries its icon, like the navigation list. */
export type IconComponent = (props: IconProps) => React.JSX.Element;

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? "size-5"}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Dashboard: (props: IconProps) => (
    <Svg {...props}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="1.5" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </Svg>
  ),
  Applications: (props: IconProps) => (
    <Svg {...props}>
      <rect x="2.5" y="6.5" width="19" height="14" rx="2" />
      <path d="M8.5 6.5V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M2.5 12h19" />
    </Svg>
  ),
  Interviews: (props: IconProps) => (
    <Svg {...props}>
      <path d="M9 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M2.5 20v-1a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v1" />
      <path d="M17 4.8a3 3 0 0 1 0 5.4" />
      <path d="M19 14.2a5 5 0 0 1 2.5 4.3V20" />
    </Svg>
  ),
  Assignments: (props: IconProps) => (
    <Svg {...props}>
      <path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5L14 2.5Z" />
      <path d="M14 2.5v5h5" />
      <path d="M10.5 13.5 8.5 15.5l2 2" />
      <path d="M14 13.5l2 2-2 2" />
    </Svg>
  ),
  Screening: (props: IconProps) => (
    <Svg {...props}>
      <path d="M6.5 3.5h-2a2 2 0 0 0-2 2.2c.6 6.6 5.2 11.2 11.8 11.8a2 2 0 0 0 2.2-2v-2a1.5 1.5 0 0 0-1.2-1.5l-2.3-.5a1.5 1.5 0 0 0-1.5.6l-.7 1a12.5 12.5 0 0 1-5-5l1-.7a1.5 1.5 0 0 0 .6-1.5l-.5-2.3A1.5 1.5 0 0 0 6.5 3.5Z" />
      <path d="M15 3.5h6M18 .5v6" transform="translate(0 3)" />
    </Svg>
  ),
  Profile: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20.5v-1a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6v1" />
    </Svg>
  ),
  Plus: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Svg>
  ),
  Pencil: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M14.5 6 18 9.5" />
    </Svg>
  ),
  Trash: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 6.5h16" />
      <path d="M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5" />
      <path d="M6 6.5 6.8 20a1.5 1.5 0 0 0 1.5 1.4h7.4a1.5 1.5 0 0 0 1.5-1.4L18 6.5" />
      <path d="M10.5 10.5v6.5M13.5 10.5v6.5" />
    </Svg>
  ),
  Calendar: (props: IconProps) => (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Svg>
  ),
  Clock: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </Svg>
  ),
  Building: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
      <path d="M15 9h3a2 2 0 0 1 2 2v10" />
      <path d="M2.5 21h19" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </Svg>
  ),
  Link: (props: IconProps) => (
    <Svg {...props}>
      <path d="M10 13.5a4 4 0 0 0 5.7.2l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
      <path d="M14 10.5a4 4 0 0 0-5.7-.2l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.5-1.5" />
    </Svg>
  ),
  Logout: (props: IconProps) => (
    <Svg {...props}>
      <path d="M9.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.5" />
      <path d="M16 16.5 20.5 12 16 7.5" />
      <path d="M20.5 12H9.5" />
    </Svg>
  ),
  Menu: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  ),
  Close: (props: IconProps) => (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  ),
  ChevronLeft: (props: IconProps) => (
    <Svg {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Svg>
  ),
  ChevronRight: (props: IconProps) => (
    <Svg {...props}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </Svg>
  ),
  ChevronDown: (props: IconProps) => (
    <Svg {...props}>
      <path d="M5.5 9.5 12 16l6.5-6.5" />
    </Svg>
  ),
  ArrowRight: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Svg>
  ),
  Check: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </Svg>
  ),
  Sparkle: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
    </Svg>
  ),
  Globe: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      <path d="M12 3a14 14 0 0 1 0 18A14 14 0 0 1 12 3Z" />
    </Svg>
  ),
  Inbox: (props: IconProps) => (
    <Svg {...props}>
      <path d="M3 13.5h4l1.5 3h7l1.5-3h4" />
      <path d="M5.2 4.5h13.6a2 2 0 0 1 1.9 1.4l1.3 7.6v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4l1.3-7.6a2 2 0 0 1 1.9-1.4Z" />
    </Svg>
  ),
  Moon: (props: IconProps) => (
    <Svg {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </Svg>
  ),
};
