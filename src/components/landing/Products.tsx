import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { Badge } from "@/components/ui-nexxu/Badge";
import { CheckIcon } from "@/components/ui-nexxu/CheckIcon";
import { cn } from "@/lib/utils";

type Variant = "light-blue" | "light-purple" | "featured" | "dark";

type Product = {
  code: string;
  name: string;
  model: string;
  period: string;
  items: string[];
  deliverable: string;
  variant: Variant;
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    code: "T1",
    name: "Diagnóstico",
    model: "DoItYourself",
    period: "45 dias · 1–3 processos",
    items: [
      "Processos mapeados e no papel",
      "Gargalos identificados com clareza",
      "Plano de ação priorizado",
      "Índice ORDEM™ da sua operação",
    ],
    deliverable: "Entregável: Você sabe onde está o problema",
    variant: "light-blue",
  },
  {
    code: "T2",
    name: "Mentoria",
    model: "DoItYourself+",
    period: "6 meses · 2–4 processos",
    items: [
      "Rotinas documentadas e funcionando",
      "Time opera sem depender de você",
      "Indicadores reais para decisão",
      "Suporte direto nas travadas",
    ],
    deliverable: "Entregável: Você tem estrutura para crescer",
    variant: "light-purple",
  },
  {
    code: "T3",
    name: "Implementação",
    model: "DoWithYou",
    period: "6 meses · 4–7 processos",
    items: [
      "Implementação lado a lado com seu time",
      "IA entra onde faz sentido — não por hype",
      "Automações que reduzem retrabalho",
      "Operação autônoma ao final do ciclo",
    ],
    deliverable: "Entregável: Sua operação para de depender de você",
    variant: "featured",
    featured: true,
  },
  {
    code: "T4",
    name: "Serviço",
    model: "DoForYou",
    period: "6 meses · 7+ processos",
    items: [
      "A Nexxu opera junto ao seu time",
      "Transformação completa da operação",
      "IA e automação em escala real",
      "Você lidera — a gente executa",
    ],
    deliverable: "Entregável: A Nexxu constrói a operação por você",
    variant: "dark",
  },
];

const variantStyles: Record<
  Variant,
  {
    card: string;
    codeColor: string;
    nameColor: string;
    modelColor: string;
    periodColor: string;
    itemColor: string;
    divider: string;
    tagBg: string;
    tagColor: string;
  }
> = {
  "light-blue": {
    card: "bg-[rgba(24,95,165,0.06)] border border-[rgba(24,95,165,0.2)]",
    codeColor: "#185FA5",
    nameColor: "#1A1520",
    modelColor: "#9090A8",
    periodColor: "#9090A8",
    itemColor: "#6B6580",
    divider: "rgba(0,0,0,0.06)",
    tagBg: "rgba(83,74,183,0.06)",
    tagColor: "rgba(83,74,183,0.7)",
  },
  "light-purple": {
    card: "bg-[rgba(83,74,183,0.06)] border border-[rgba(83,74,183,0.2)]",
    codeColor: "#534AB7",
    nameColor: "#1A1520",
    modelColor: "#9090A8",
    periodColor: "#9090A8",
    itemColor: "#6B6580",
    divider: "rgba(0,0,0,0.06)",
    tagBg: "rgba(83,74,183,0.06)",
    tagColor: "rgba(83,74,183,0.7)",
  },
  featured: {
    card: "",
    codeColor: "#534AB7",
    nameColor: "#1A1520",
    modelColor: "#9090A8",
    periodColor: "#9090A8",
    itemColor: "#6B6580",
    divider: "rgba(0,0,0,0.06)",
    tagBg: "rgba(83,74,183,0.06)",
    tagColor: "rgba(83,74,183,0.7)",
  },
  dark: {
    card: "bg-[#0F0C1A] border border-[rgba(175,169,236,0.3)]",
    codeColor: "rgba(175,169,236,0.7)",
    nameColor: "#fff",
    modelColor: "rgba(255,255,255,0.45)",
    periodColor: "rgba(255,255,255,0.4)",
    itemColor: "rgba(255,255,255,0.6)",
    divider: "rgba(255,255,255,0.08)",
    tagBg: "rgba(175,169,236,0.08)",
    tagColor: "rgba(175,169,236,0.6)",
  },
};

function ProductCard({ p }: { p: Product }) {
  const s = variantStyles[p.variant];
  const featuredStyle = p.featured
    ? {
        background: "linear-gradient(135deg,rgba(24,95,165,.08),rgba(83,74,183,.1))",
        boxShadow: "0 0 48px rgba(83,74,183,.25),0 8px 32px rgba(0,0,0,.1)",
        outline: "2px solid rgba(83,74,183,.5)",
      }
    : { boxShadow: "0 2px 8px rgba(0,0,0,.04)" };

  return (
    <div
      className={cn(
        "rounded-[28px] overflow-hidden flex flex-col relative transition-all duration-300 hover:-translate-y-1",
        s.card,
        p.featured && "-translate-y-1.5 hover:-translate-y-2.5",
      )}
      style={featuredStyle}
    >
      {p.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px] bg-brand-gradient"
          style={{ boxShadow: "0 0 12px rgba(83,74,183,.6)" }}
        />
      )}
      <div className="p-7 flex-1">
        <div className="flex justify-between items-start mb-5">
          <div>
            <span
              className="text-[11px] font-semibold tracking-wider uppercase block mb-1"
              style={{ color: s.codeColor }}
            >
              {p.code}
            </span>
            <div className="text-xl font-extrabold tracking-tight my-1" style={{ color: s.nameColor }}>
              {p.name}
            </div>
            <span className="text-xs font-medium" style={{ color: s.modelColor }}>
              {p.model}
            </span>
          </div>
          {p.featured && <Badge variant="featured">mais escolhido</Badge>}
        </div>

        <div className="text-[13px] mb-5" style={{ color: s.periodColor }}>
          {p.period}
        </div>
        <div className="h-px mb-5" style={{ background: s.divider }} />

        <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
          {p.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[13px] leading-snug"
              style={{ color: s.itemColor }}
            >
              <CheckIcon variant={p.variant === "dark" ? "dark" : "light"} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6 pt-4">
        <div
          className="text-xs font-medium px-3 py-1.5 rounded-[10px] text-center"
          style={{ color: s.tagColor, background: s.tagBg }}
        >
          {p.deliverable}
        </div>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section id="produtos" className="bg-white px-[5%] py-24">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader
          label="PRODUTOS"
          labelColor="var(--brand-blue)"
          title={
            <>
              Qual nível de suporte
              <br />
              sua operação precisa?
            </>
          }
          description="Cada empresa está em um momento diferente. A conversa de diagnóstico define o caminho — sem pressão."
        />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.code} p={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-9 py-4 rounded-2xl text-white text-base bg-brand-gradient hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 28px rgba(83,74,183,.45)" }}
          >
            Conversar sobre meu caso →
          </Link>
          <p className="text-[13px] text-[var(--brand-subtle)] mt-3">
            15 minutos. Sem pitch de venda. Só diagnóstico.
          </p>
        </div>
      </div>
    </section>
  );
}
