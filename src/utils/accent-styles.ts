import type { AccentColor } from "./solucoes-data";

export const ACCENT_STYLES: Record<
  AccentColor,
  { barTop: string; iconBg: string; iconColor: string }
> = {
  blue: {
    barTop: "var(--brand-blue)",
    iconBg: "rgba(24,95,165,0.10)",
    iconColor: "var(--brand-blue)",
  },
  purple: {
    barTop: "var(--brand-purple)",
    iconBg: "rgba(83,74,183,0.10)",
    iconColor: "var(--brand-purple)",
  },
  teal: {
    barTop: "var(--brand-teal)",
    iconBg: "rgba(93,202,165,0.12)",
    iconColor: "var(--brand-teal)",
  },
};
