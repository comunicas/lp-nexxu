import type { CSSProperties, ReactNode } from "react";

type Props = {
  name: string;
  token: string;
  preview: CSSProperties;
  dark?: boolean;
  children?: ReactNode;
};

export function DSTokenCard({ name, token, preview, dark, children }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(83,74,183,0.12)] bg-white">
      <div
        className={`h-32 flex items-center justify-center p-4 ${
          dark ? "bg-[var(--brand-dark)]" : "bg-[var(--brand-page)]"
        }`}
      >
        <div
          className="w-full h-full rounded-xl flex items-center justify-center text-white font-display font-bold"
          style={preview}
        >
          {children}
        </div>
      </div>
      <div className="p-3.5">
        <p className="font-display font-bold text-[14px] text-[var(--brand-text)]">{name}</p>
        <p className="text-[11px] font-mono text-[var(--brand-muted)] mt-0.5">{token}</p>
      </div>
    </div>
  );
}
