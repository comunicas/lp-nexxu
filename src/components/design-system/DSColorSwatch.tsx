import { useState } from "react";

type Props = {
  name: string;
  token: string;
  hex: string;
  textOnDark?: boolean;
};

export function DSColorSwatch({ name, token, hex, textOnDark }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (value: string) => {
    void navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[rgba(83,74,183,0.12)] bg-white">
      <div
        className="h-24 flex items-end justify-end p-3"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            textOnDark ? "bg-white/15 text-white" : "bg-black/10 text-black/70"
          }`}
        >
          {hex}
        </span>
      </div>
      <div className="p-3.5">
        <p className="font-display font-bold text-[14px] text-[var(--brand-text)] leading-tight">
          {name}
        </p>
        <button
          type="button"
          onClick={() => copy(`var(${token})`)}
          className="mt-1 text-[11px] font-mono text-[var(--brand-muted)] hover:text-[var(--brand-purple)] transition-colors block"
          title="Copiar var()"
        >
          var({token})
        </button>
        <button
          type="button"
          onClick={() => copy(hex)}
          className="text-[11px] font-mono text-[var(--brand-muted)] hover:text-[var(--brand-purple)] transition-colors"
          title="Copiar HEX"
        >
          {hex}
        </button>
        {copied && (
          <p className="mt-1 text-[10px] text-[var(--brand-teal)] font-semibold">
            Copiado!
          </p>
        )}
      </div>
    </div>
  );
}
