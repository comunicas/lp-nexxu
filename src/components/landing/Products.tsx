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
  price: string;
  priceSub: string;
  accentColor: string; // hex or "gradient"
  featured?: boolean;
};

const PRODUCTS: Product[] = [
  {
    step: 1,
    category: "Porta de Entrada",
    verb: "Mapear",
    promise:
      "Você sai sabendo exatamente onde está o problema — e o que fazer primeiro.",
    duration: "45 dias",
    scope: "1 a 3 processos",
    price: "R$ 500 – 1.500",
    priceSub: "pagamento único",
    accentColor: "#185FA5",
    items: [
      "Processos mapeados no papel",
      "Gargalos identificados com clareza",
      "Plano de ação priorizado",
      "Índice ORDEM™ calculado",
    ],
  },
  {
    step: 2,
    category: "Estruturação",
    verb: "Estruturar",
    promise:
      "Seu time ganha rotina, padrão e indicadores reais para operar sem depender de você.",
    duration: "6 meses",
    scope: "2 a 4 processos",
    price: "R$ 3.000 – 6.000",
    priceSub: "investimento total",
    accentColor: "#534AB7",
    items: [
      "Rotinas documentadas e ativas",
      "Time opera com autonomia crescente",
      "Indicadores reais — sem feeling",
      "Suporte direto nas travadas",
    ],
  },
  {
    step: 3,
    category: "Execução Guiada",
    verb: "Implementar",
    promise:
      "Sua operação para de depender de você ao final do ciclo. Com IA onde faz sentido.",
    duration: "6 meses",
    scope: "4 a 7 processos",
    price: "R$ 8.000 – 15.000",
    priceSub: "investimento total",
    accentColor: "gradient",
    featured: true,
    items: [
      "Implementação lado a lado com o time",
      "IA aplicada nos pontos de maior impacto",
      "Automações que eliminam retrabalho",
      "Operação autônoma ao final do ciclo",
    ],
  },
  {
    step: 4,
    category: "Full Service",
    verb: "Terceirizar",
    promise:
      "A Nexxu opera junto ao seu time. Você lidera — a gente executa e entrega.",
    duration: "6 meses",
    scope: "7+ processos",
    price: "A partir de R$ 20.000",
    priceSub: "sob consulta",
    accentColor: "#5DCAA5",
    items: [
      "Nexxu opera junto ao seu time",
      "Transformação completa da operação",
      "IA e automação em escala real",
      "Zero responsabilidade operacional do dono",
    ],
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
  const isGradient = p.accentColor === "gradient";
  const accentBg = isGradient
    ? "linear-gradient(90deg,#185FA5,#534AB7)"
    : p.accentColor;
  const titleId = `prod-${p.step}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex flex-col rounded-[24px] bg-white border transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(83,74,183,0.12)]",
        p.featured
          ? "border-[rgba(83,74,183,0.35)] shadow-[0_0_32px_rgba(83,74,183,0.15),0_4px_20px_rgba(0,0,0,0.05)]"
          : "border-[rgba(26,21,32,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.03)]",
      )}
    >
      {/* barra superior accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
        style={{ background: accentBg }}
      />

      {p.featured && (
        <div className="absolute -top-3 right-6">
          <Badge variant="featured">
            <span className="sr-only">Produto </span>mais escolhido
          </Badge>
        </div>
      )}

      <div className="p-7 pt-8 flex-1 flex flex-col">
        {/* eyebrow: ETAPA N · CATEGORIA */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--brand-subtle)]">
            ETAPA {p.step}
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--brand-subtle)]/40" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--brand-subtle)]">
            {p.category.toUpperCase()}
          </span>
        </div>

        {/* verbo */}
        <h3
          id={titleId}
          className="font-display font-extrabold text-[30px] leading-none tracking-tight text-[var(--brand-text)] mb-3"
        >
          {p.verb}
        </h3>

        {/* preço */}
        <div className="mb-4">
          {isGradient ? (
            <div className="font-display font-extrabold text-[18px] leading-tight grad-text">
              {p.price}
            </div>
          ) : (
            <div
              className="font-display font-extrabold text-[18px] leading-tight"
              style={{ color: p.accentColor }}
            >
              {p.price}
            </div>
          )}
          <div className="text-[11px] font-medium tracking-wide mt-0.5 text-[var(--brand-subtle)]">
            {p.priceSub}
          </div>
        </div>

        {/* promessa */}
        <p className="text-[14px] leading-relaxed text-[var(--brand-muted)] mb-5 min-h-[56px]">
          {p.promise}
        </p>

        {/* meta */}
        <div className="flex items-center gap-2 text-[12px] text-[var(--brand-subtle)] mb-5">
          <ClockIcon />
          <span>
            <span className="sr-only">Duração: </span>
            {p.duration}
          </span>
          <span className="opacity-40" aria-hidden="true">·</span>
          <span>
            <span className="sr-only">Escopo: </span>
            {p.scope}
          </span>
        </div>

        <div className="h-px bg-[rgba(26,21,32,0.06)] mb-5" aria-hidden="true" />

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

        {/* CTA */}
        <div className="mt-7">
          {p.featured ? (
            <Link
              to="/diagnostico"
              aria-label={`Quero o caminho ${p.verb} (etapa ${p.step}: ${p.category}) — iniciar diagnóstico`}
              className="inline-flex w-full items-center justify-center gap-2 font-display font-bold px-5 py-3 rounded-xl text-white text-[14px] bg-brand-gradient transition-all duration-200 hover:-translate-y-0.5 focus-ring-light"
              style={{ boxShadow: "0 0 20px rgba(83,74,183,.4)" }}
            >
              <span>Quero esse caminho</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link
              to="/diagnostico"
              aria-label={`Quero o caminho ${p.verb} (etapa ${p.step}: ${p.category}) — iniciar diagnóstico`}
              className="inline-flex items-center gap-1.5 font-display font-bold text-[13.5px] text-[var(--brand-purple)] transition-all duration-200 hover:gap-2.5 rounded-md focus-ring-light"
            >
              Quero esse <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section
      id="produtos"
      aria-labelledby="produtos-title"
      className="bg-white px-[5%] py-24"
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          titleId="produtos-title"
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
        <ol
          aria-label="Progressão de etapas dos produtos"
          className="list-none p-0 flex items-center justify-center gap-3 mb-10 flex-wrap"
        >
          {[1, 2, 3, 4].map((n, i) => (
            <li key={n} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-gradient text-white text-[11px] font-bold"
                >
                  {n}
                </span>
                <span className="text-[11px] font-bold tracking-[0.14em] text-[var(--brand-subtle)] uppercase">
                  Etapa {n}
                </span>
              </div>
              {i < 3 && (
                <span
                  className="w-8 h-px bg-[var(--brand-subtle)]/30"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.step} p={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[14px] text-[var(--brand-muted)] mb-4">
            Não sabe qual caminho? A conversa de diagnóstico clareia isso em 15 minutos.
          </p>
          <Link
            to="/diagnostico"
            aria-label="Conversar com a Nexxu sobre meu caso — iniciar diagnóstico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-7 py-3.5 rounded-2xl text-white text-[15px] bg-brand-gradient hover:-translate-y-0.5 focus-ring-light"
            style={{ boxShadow: "0 0 28px rgba(83,74,183,.45)" }}
          >
            <span>Conversar sobre meu caso</span>
            <span aria-hidden="true">→</span>
          </Link>
          <p className="text-[12px] text-[var(--brand-subtle)] mt-3">
            15 minutos. Sem pitch. Só diagnóstico.
          </p>
        </div>
      </div>
    </section>
  );
}
