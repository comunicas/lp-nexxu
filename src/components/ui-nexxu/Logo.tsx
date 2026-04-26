type LogoProps = {
  variant?: "full" | "mark";
  className?: string;
};

export function Logo({ variant = "full", className }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        width="24"
        height="28"
        viewBox="0 0 24 28"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Nexxu"
      >
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#185FA5" />
            <stop offset="100%" stopColor="#534AB7" />
          </linearGradient>
          <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#185FA5" />
            <stop offset="100%" stopColor="#534AB7" />
          </linearGradient>
        </defs>
        <circle cx="3" cy="14" r="2.4" fill="url(#hg)" />
        <circle cx="12" cy="3" r="2.2" fill="#534AB7" opacity=".85" />
        <circle cx="12" cy="14" r="2.8" fill="url(#hg)" />
        <circle cx="12" cy="25" r="2.2" fill="#534AB7" opacity=".85" />
        <circle cx="21" cy="8" r="1.8" fill="#7F77DD" opacity=".7" />
        <circle cx="21" cy="20" r="1.8" fill="#7F77DD" opacity=".7" />
        <line x1="3" y1="14" x2="12" y2="3" stroke="url(#hg2)" strokeWidth="1" opacity=".5" />
        <line x1="3" y1="14" x2="12" y2="14" stroke="url(#hg2)" strokeWidth="1.4" opacity=".8" />
        <line x1="3" y1="14" x2="12" y2="25" stroke="url(#hg2)" strokeWidth="1" opacity=".5" />
        <line x1="12" y1="3" x2="21" y2="8" stroke="#534AB7" strokeWidth=".8" opacity=".4" />
        <line x1="12" y1="14" x2="21" y2="8" stroke="#534AB7" strokeWidth=".8" opacity=".4" />
        <line x1="12" y1="14" x2="21" y2="20" stroke="#534AB7" strokeWidth=".8" opacity=".4" />
        <line x1="12" y1="25" x2="21" y2="20" stroke="#534AB7" strokeWidth=".8" opacity=".4" />
      </svg>
    );
  }

  return (
    <svg
      width="140"
      height="32"
      viewBox="0 0 160 36"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Nexxu"
    >
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#85B7EB" />
          <stop offset="100%" stopColor="#AFA9EC" />
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#85B7EB" />
          <stop offset="100%" stopColor="#CECBF6" />
        </linearGradient>
      </defs>
      <circle cx="4" cy="18" r="3" fill="url(#lg1)" />
      <circle cx="14" cy="8" r="2.5" fill="#AFA9EC" opacity=".85" />
      <circle cx="14" cy="18" r="3.2" fill="url(#lg1)" />
      <circle cx="14" cy="28" r="2.5" fill="#AFA9EC" opacity=".85" />
      <circle cx="23" cy="13" r="2" fill="#CECBF6" opacity=".7" />
      <circle cx="23" cy="23" r="2" fill="#CECBF6" opacity=".7" />
      <line x1="4" y1="18" x2="14" y2="8" stroke="url(#lg2)" strokeWidth="1.1" opacity=".5" />
      <line x1="4" y1="18" x2="14" y2="18" stroke="url(#lg2)" strokeWidth="1.8" opacity=".8" />
      <line x1="4" y1="18" x2="14" y2="28" stroke="url(#lg2)" strokeWidth="1.1" opacity=".5" />
      <line x1="14" y1="8" x2="23" y2="13" stroke="#AFA9EC" strokeWidth=".9" opacity=".4" />
      <line x1="14" y1="18" x2="23" y2="13" stroke="#AFA9EC" strokeWidth=".9" opacity=".4" />
      <line x1="14" y1="18" x2="23" y2="23" stroke="#AFA9EC" strokeWidth=".9" opacity=".4" />
      <line x1="14" y1="28" x2="23" y2="23" stroke="#AFA9EC" strokeWidth=".9" opacity=".4" />
      <text
        x="32"
        y="25"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="url(#lg2)"
        letterSpacing="-0.7"
      >
        nexxu
      </text>
    </svg>
  );
}
