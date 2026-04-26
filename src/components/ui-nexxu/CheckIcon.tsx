type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export function CheckIcon({ variant = "light", className }: Props) {
  const bg = variant === "dark" ? "rgba(175,169,236,0.15)" : "rgba(93,202,165,0.15)";
  const stroke = variant === "dark" ? "#AFA9EC" : "#5DCAA5";

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className={className}
      style={{ flexShrink: 0, marginTop: 1 }}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="7" fill={bg} />
      <polyline
        points="4,7 6,9 10,5"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
