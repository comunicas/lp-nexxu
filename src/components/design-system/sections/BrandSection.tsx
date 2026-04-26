import { Logo } from "@/components/ui-nexxu/Logo";
import { Badge } from "@/components/ui-nexxu/Badge";
import { DSSection } from "../DSSection";

const PILLARS = [
  {
    letter: "O",
    name: "Organização",
    desc: "Papéis claros, organograma vivo e responsabilidade definida.",
  },
  {
    letter: "R",
    name: "Rotinas",
    desc: "Processos documentados, rituais com cadência e KPIs.",
  },
  {
    letter: "D",
    name: "Dados",
    desc: "Decisão guiada por número — não por feeling.",
  },
  {
    letter: "E",
    name: "Eficiência IA",
    desc: "Stack integrada, automações e IA reduzindo o braçal.",
  },
  {
    letter: "M",
    name: "Maturidade",
    desc: "A operação roda mesmo quando o dono sai.",
  },
];

export function BrandSection() {
  return (
    <DSSection
      id="brand"
      title="Brand"
      description="Quem é a Nexxu, o que vendemos e a metodologia que ancora todos os ativos visuais."
    >
      <div className="rounded-3xl bg-[var(--brand-dark)] text-white p-8 md:p-12 mb-8 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ background: "rgba(83,74,183,0.4)" }}
        />
        <div className="relative">
          <Badge variant="hero" className="mb-6">
            CONSULTORIA DE INOVAÇÃO OPERACIONAL
          </Badge>
          <div className="mb-6 flex items-center gap-4">
            <Logo />
          </div>
          <h3 className="font-display font-extrabold text-[clamp(28px,3.4vw,40px)] leading-tight max-w-2xl">
            <span className="grad-text-pale">
              Você não tem problema de esforço. Tem problema de processo.
            </span>
          </h3>
          <p className="mt-4 text-white/65 text-[15px] max-w-xl leading-relaxed">
            Em 90 dias, a empresa para de depender do dono — e começa a operar com clareza,
            rotina e resultado previsível. Tudo via método ORDEM™.
          </p>
        </div>
      </div>

      <div>
        <p className="section-label text-[var(--brand-purple)] mb-4">Método ORDEM™</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PILLARS.map((p) => (
            <div
              key={p.letter}
              className="rounded-2xl border border-[rgba(83,74,183,0.15)] bg-white p-5"
            >
              <div className="grad-text font-display font-extrabold text-[42px] leading-none mb-2">
                {p.letter}
              </div>
              <p className="font-display font-bold text-[14px] text-[var(--brand-text)]">
                {p.name}
              </p>
              <p className="text-[12px] text-[var(--brand-muted)] mt-1.5 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DSSection>
  );
}
