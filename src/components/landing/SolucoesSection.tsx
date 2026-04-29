import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  LayoutGrid,
  Layers,
  Users,
  Activity,
  Grid2x2,
  type LucideIcon,
} from "lucide-react";

type AccentColor = "blue" | "purple" | "teal";

type Solucao = {
  id: string;
  icon: LucideIcon;
  accentColor: AccentColor;
  title: string;
  description: string;
};

const SOLUCOES: Solucao[] = [
  {
    id: "diagnostico",
    icon: Clock,
    accentColor: "blue",
    title: "Diagnóstico Operacional",
    description:
      "Identificamos onde o negócio trava — gargalos, retrabalho e dependências do dono — em 45 dias.",
  },
  {
    id: "processos",
    icon: LayoutGrid,
    accentColor: "purple",
    title: "Mapeamento de Processos",
    description:
      "Quem faz, como faz, onde trava. Nada muda antes de estar claro no papel — esse é o ponto de partida.",
  },
  {
    id: "ia",
    icon: Layers,
    accentColor: "teal",
    title: "Implementação com IA",
    description:
      "IA aplicada nos pontos certos — depois do processo. Automações que eliminam retrabalho de verdade.",
  },
  {
    id: "mentoria",
    icon: Users,
    accentColor: "blue",
    title: "Mentoria para o Dono",
    description:
      "Acompanhamento direto para o dono sair da operação e o time passar a funcionar sem depender dele.",
  },
  {
    id: "kpis",
    icon: Activity,
    accentColor: "purple",
    title: "KPIs e Gestão com Dados",
    description:
      "Painel simples e confiável para decisões reais — sem achismo, sem planilha interminável.",
  },
  {
    id: "autonomia",
    icon: Grid2x2,
    accentColor: "teal",
    title: "Autonomia Operacional",
    description:
      "Empresa funcionando sem o dono no centro. Delegação estruturada, time treinado, processo documentado.",
  },
];

const ACCENT_STYLES: Record<
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

export function SolucoesSection() {
  return (
    <section
      id="solucoes"
      className="px-[5%] py-24"
      style={{ background: "var(--brand-page)" }}
    >
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="SOLUÇÕES"
          labelColor="var(--brand-blue)"
          title="O que a Nexxu resolve na sua operação"
          description="Cada entrega é parte do Método ORDEM™ — processo primeiro, IA depois, quando faz sentido."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUCOES.map((item) => {
            const accent = ACCENT_STYLES[item.accentColor];
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="bg-white border border-[rgba(83,74,183,0.12)] rounded-[20px] p-7 relative overflow-hidden"
              >
                <span
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: accent.barTop }}
                  aria-hidden="true"
                />
                <div
                  className="flex items-center justify-center mb-[18px]"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: accent.iconBg,
                  }}
                >
                  <Icon size={22} style={{ color: accent.iconColor }} />
                </div>
                <h3 className="font-display font-bold text-[15px] text-[var(--brand-text)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[var(--brand-muted)] leading-[1.55] mb-4">
                  {item.description}
                </p>
                <Link
                  to="/diagnostico"
                  className="text-[13px] font-semibold text-[var(--brand-blue)]"
                >
                  Saiba mais →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
