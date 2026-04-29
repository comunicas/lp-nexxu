import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { Badge } from "@/components/ui-nexxu/Badge";
import { CheckIcon } from "@/components/ui-nexxu/CheckIcon";
import { cn } from "@/lib/utils";

type Product = {
  step: 1 | 2 | 3 | 4;
  category: string;
  verb: string;
  promise: string;
  duration: string;
  scope: string;
  items: string[];
  accent: string;
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    step: 1,
    category: "Diagnóstico",
    verb: "Mapear",
    promise: "Você sai sabendo exatamente onde o negócio trava — e por onde começar.",
    duration: "45 dias",
    scope: "1 a 3 processos",
    items: [
      "Processos críticos mapeados no papel",
      "Gargalos identificados com clareza",
      "Plano de ação priorizado",
      "Índice ORDEM™ calculado",
    ],
    accent: "var(--brand-blue)",
  },
  {
    step: 2,
    category: "Mentoria",
    verb: "Estruturar",
    promise: "Seu time passa a operar sem precisar de você em tudo.",
    duration: "6 meses",
    scope: "2 a 4 processos",
    items: [
      "Rotinas documentadas e rodando",
      "Time opera sem depender de você",
      "Indicadores reais para decisão",
      "Suporte direto nas travadas",
    ],
    accent: "var(--brand-purple)",
  },
  {
    step: 3,
    category: "Implementação",
    verb: "Implementar",
    promise: "A Nexxu implementa junto. Você acompanha. A operação para de depender de você.",
    duration: "6 meses",
    scope: "4 a 7 processos",
    items: [
      "Implementação lado a lado com seu time",
      "IA aplicada onde faz sentido — não por hype",
      "Automações que eliminam retrabalho",
      "Operação autônoma ao fim do ciclo",
    ],
    accent: "linear-gradient(90deg,#185fa5,#534ab7)",
    featured: true,
  },
  {
    step: 4,
    category: "Serviço",
    verb: "Terceirizar",
    promise: "A Nexxu assume a execução. Você só lidera.",
    duration: "6 meses",
    scope: "7+ processos",
    items: [
      "Nexxu opera junto ao seu time",
      "Transformação completa em 6 meses",
      "IA e automação em escala real",
      "Zero operacional nas suas costas",
    ],
    accent: "var(--brand-dark)",
  },
];

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-[24px] bg-white border transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(83,74,183,0.12)]",
        p.featured
          ? "border-[rgba(83,74,183,0.35)] shadow-[0_0_32px_rgba(83,74,183,0.15),0_4px_20px_rgba(0,0,0,0.05)]"
          : "border-[rgba(26,21,32,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.03)]",
      )}
    >
      {/* step accent — barra superior fina */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
        style={{ background: p.accent }}
      />

      {p.featured && (
        <div className="absolute -top-3 right-6">
          <Badge variant="featured">mais escolhido</Badge>
        </div>
      )}

      <div className="p-7 pt-8 flex-1 flex flex-col">
        {/* eyebrow: etapa + categoria */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="text-[10px] font-bold tracking-[0.14em] text-[var(--brand-subtle)]"
          >
            NÍVEL {p.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--brand-subtle)]/40" />
          <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--brand-subtle)]">
            {p.category.toUpperCase()}
          </span>
        </div>

        {/* verbo de ação */}
        <h3 className="font-display font-extrabold text-[28px] leading-none tracking-tight text-[var(--brand-text)] mb-3">
          {p.verb}
        </h3>

        {/* promessa */}
        <p className="text-[14px] leading-relaxed text-[var(--brand-muted)] mb-5">
          {p.promise}
        </p>

        {/* meta info */}
        <div className="flex items-center gap-2 text-[12px] text-[var(--brand-subtle)] mb-5">
          <ClockIcon />
          <span>{p.duration}</span>
          <span className="opacity-40">·</span>
          <span>{p.scope}</span>
        </div>

        <div className="h-px bg-[rgba(26,21,32,0.06)] mb-5" />

        {/* bullets */}
        <ul className="m-0 p-0 list-none flex flex-col gap-3 flex-1">
          {p.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[var(--brand-muted)]"
            >
              <CheckIcon variant="light" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA por card */}
        <div className="mt-7">
          {p.featured ? (
            <Link
              to="/diagnostico"
              className="inline-flex w-full items-center justify-center gap-2 font-display font-bold px-5 py-3 rounded-xl text-white text-[14px] bg-brand-gradient transition-all duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 20px rgba(83,74,183,.4)" }}
            >
              Quero esse caminho →
            </Link>
          ) : (
            <Link
              to="/diagnostico"
              className="inline-flex w-full items-center justify-center gap-1.5 font-display font-bold text-[13.5px] text-[var(--brand-purple)] border border-[rgba(83,74,183,0.3)] rounded-xl px-5 py-2.5 transition-all duration-200 hover:bg-[rgba(83,74,183,0.05)] hover:border-[rgba(83,74,183,0.5)]"
            >
              Quero esse caminho →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section id="produtos" className="bg-white px-[5%] py-24">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="PRODUTOS"
          labelColor="var(--brand-blue)"
          title={
            <>
              Quatro caminhos.
              <br />
              <span className="grad-text">Mesma direção.</span>
            </>
          }
          description="Tirar a operação das suas costas. A conversa de diagnóstico define por onde começar — sem pressão de venda."
        />

        {/* indicador de progressão */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { n: 1, label: "Diagnóstico" },
            { n: 2, label: "Mentoria" },
            { n: 3, label: "Implementação" },
            { n: 4, label: "Serviço" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-extrabold tracking-widest text-[var(--brand-purple)]">
                  0{n}
                </span>
                <span className="text-[9px] font-medium text-[var(--brand-subtle)] tracking-wide hidden sm:block">
                  {label}
                </span>
              </div>
              {n < 4 && (
                <span className="w-8 h-px bg-[var(--brand-purple)]/20" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.step} p={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[14px] text-[var(--brand-muted)] mb-4">
            Não sabe por onde começar? O diagnóstico define isso.
          </p>
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-7 py-3.5 rounded-2xl text-white text-[15px] bg-brand-gradient hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 28px rgba(83,74,183,.45)" }}
          >
            Conversar sobre meu caso →
          </Link>
          <p className="text-[12px] text-[var(--brand-subtle)] mt-3">
            15 minutos. Sem pitch. Só diagnóstico.
          </p>
        </div>
      </div>
    </section>
  );
}
