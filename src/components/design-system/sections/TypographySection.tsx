import { DSSection } from "../DSSection";

const SCALE = [
  {
    label: "Hero H1 (grad-text-hero)",
    sample: "Você não tem problema de esforço.",
    className:
      "grad-text-hero font-display font-extrabold text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight",
    bgDark: true,
  },
  {
    label: "Section H2",
    sample: "O método ORDEM™ em 90 dias",
    className:
      "font-display font-extrabold text-[clamp(28px,3.2vw,42px)] tracking-tight leading-tight text-[var(--brand-text)]",
  },
  {
    label: "H3",
    sample: "Diagnóstico ORDEM™",
    className:
      "font-display font-bold text-[22px] tracking-tight text-[var(--brand-text)]",
  },
  {
    label: "Body (Outfit 16)",
    sample:
      "Em 90 dias, sua empresa para de depender de você para tudo — e começa a operar com clareza, rotina e resultado previsível.",
    className: "text-[16px] leading-relaxed text-[var(--brand-text)]/85",
  },
  {
    label: "Muted (Outfit 14)",
    sample: "Sem cadastro. Sem pitch de venda. Só clareza.",
    className: "text-[14px] text-[var(--brand-muted)]",
  },
  {
    label: "Section Label (.section-label)",
    sample: "PRÓXIMO PASSO",
    className: "section-label text-[var(--brand-purple)]",
  },
];

export function TypographySection() {
  return (
    <DSSection
      id="tipografia"
      title="Tipografia"
      description="Outfit para texto corrido, Space Grotesk para títulos e displays. Escala fluida via clamp()."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] bg-white p-6">
          <p className="section-label text-[var(--brand-purple)] mb-2">Sans</p>
          <p style={{ fontFamily: "Outfit, sans-serif" }} className="text-3xl font-bold mb-1">
            Outfit
          </p>
          <p style={{ fontFamily: "Outfit, sans-serif" }} className="text-sm text-[var(--brand-muted)]">
            400 · 500 · 600 · 700 · 800 · 900
          </p>
        </div>
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] bg-white p-6">
          <p className="section-label text-[var(--brand-purple)] mb-2">Display</p>
          <p
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-3xl font-bold mb-1"
          >
            Space Grotesk
          </p>
          <p
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-sm text-[var(--brand-muted)]"
          >
            400 · 500 · 600 · 700 · 800
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {SCALE.map((row) => (
          <div
            key={row.label}
            className={`rounded-2xl border border-[rgba(83,74,183,0.12)] p-6 ${
              row.bgDark ? "bg-[var(--brand-dark)]" : "bg-white"
            }`}
          >
            <p className="section-label text-[var(--brand-purple)] mb-3">{row.label}</p>
            <p className={row.className}>{row.sample}</p>
          </div>
        ))}
      </div>
    </DSSection>
  );
}
