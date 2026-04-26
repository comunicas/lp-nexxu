import { DSSection } from "../DSSection";
import { DSColorSwatch } from "../DSColorSwatch";

const PRIMARIES = [
  { name: "Brand Blue", token: "--brand-blue", hex: "#185FA5", textOnDark: true },
  { name: "Brand Purple", token: "--brand-purple", hex: "#534AB7", textOnDark: true },
  { name: "Purple Deep", token: "--brand-purple-deep", hex: "#3C3489", textOnDark: true },
];

const PURPLES = [
  { name: "Purple Mid", token: "--brand-purple-mid", hex: "#7F77DD", textOnDark: true },
  { name: "Purple Light", token: "--brand-purple-light", hex: "#AFA9EC", textOnDark: false },
  { name: "Purple Pale", token: "--brand-purple-pale", hex: "#CECBF6", textOnDark: false },
  { name: "Purple Min", token: "--brand-purple-min", hex: "#EEEDFE", textOnDark: false },
];

const ACCENTS = [
  { name: "Teal (sucesso)", token: "--brand-teal", hex: "#5DCAA5", textOnDark: false },
  { name: "Amber (alerta)", token: "--brand-amber", hex: "#EF9F27", textOnDark: false },
];

const NEUTRALS = [
  { name: "Dark", token: "--brand-dark", hex: "#0F0C1A", textOnDark: true },
  { name: "Dark 2", token: "--brand-dark-2", hex: "#1A1520", textOnDark: true },
  { name: "Page", token: "--brand-page", hex: "#F8F7FF", textOnDark: false },
  { name: "Text", token: "--brand-text", hex: "#1A1520", textOnDark: true },
  { name: "Muted", token: "--brand-muted", hex: "#6B6580", textOnDark: true },
  { name: "Subtle", token: "--brand-subtle", hex: "#9090A8", textOnDark: true },
];

function Group({ label, items }: { label: string; items: typeof PRIMARIES }) {
  return (
    <div className="mb-8">
      <h3 className="font-display font-bold text-[15px] text-[var(--brand-text)] mb-3">
        {label}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((c) => (
          <DSColorSwatch key={c.token} {...c} />
        ))}
      </div>
    </div>
  );
}

export function ColorsSection() {
  return (
    <DSSection
      id="cores"
      title="Cores"
      description="Paleta da marca exposta como tokens CSS. Clique em qualquer valor para copiar."
    >
      <Group label="Primárias" items={PRIMARIES} />
      <Group label="Família roxa" items={PURPLES} />
      <Group label="Acentos" items={ACCENTS} />
      <Group label="Neutros" items={NEUTRALS} />
    </DSSection>
  );
}
