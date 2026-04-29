import { Link } from "@tanstack/react-router";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import type { SolucaoData } from "@/utils/solucoes-data";
import { ACCENT_STYLES } from "@/utils/accent-styles";

type Props = {
  solucao: SolucaoData;
  relacionadas: SolucaoData[];
};

export function SolucaoPageTemplate({ solucao, relacionadas }: Props) {
  const accent = ACCENT_STYLES[solucao.accentColor];
  const Icon = solucao.icon;

  return (
    <>
      <Nav />

      {/* HERO DARK */}
      <section
        className="px-[5%] pt-32 pb-20"
        style={{ background: "var(--brand-dark)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
            <Link to="/" className="hover:text-white transition">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/" hash="solucoes" className="hover:text-white transition">
              Soluções
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{solucao.title}</span>
          </nav>

          {/* Badge de fase ORDEM */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              background: accent.iconBg,
              color: accent.iconColor,
              border: `1px solid ${accent.barTop}`,
            }}
          >
            Método ORDEM™ · {solucao.faseOrdem}
          </div>

          {/* Ícone + título */}
          <div className="flex items-start gap-5 mb-8">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl shrink-0"
              style={{ background: accent.iconBg }}
            >
              <Icon className="w-8 h-8" style={{ color: accent.iconColor }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              {solucao.title}
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-white/80 italic max-w-3xl mb-10">
            "{solucao.tagline}"
          </p>

          {/* CTA */}
          <Link
            to="/diagnostico"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition hover:opacity-90"
            style={{ background: accent.barTop }}
          >
            Quero um diagnóstico gratuito <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="px-[5%] py-20" style={{ background: "var(--brand-page)" }}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--brand-dark)" }}>
            Para quem é essa solução
          </h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            {solucao.paraQuem}
          </p>
        </div>
      </section>

      {/* O PROBLEMA QUE RESOLVE */}
      <section className="px-[5%] py-20 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-semibold mb-6" style={{ color: "var(--brand-dark)" }}>
            O problema que resolvemos
          </h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            {solucao.oProblema}
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="px-[5%] py-20" style={{ background: "var(--brand-page)" }}>
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-semibold mb-12" style={{ color: "var(--brand-dark)" }}>
            Como funciona
          </h2>
          <div className="grid gap-6">
            {solucao.comoFunciona.map((item) => (
              <div
                key={item.step}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-black/5"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 font-semibold text-white"
                  style={{ background: accent.barTop }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--brand-dark)" }}>
                    {item.titulo}
                  </h3>
                  <p className="text-foreground/75 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGÁVEIS */}
      <section className="px-[5%] py-20 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-3xl font-semibold mb-10" style={{ color: "var(--brand-dark)" }}>
            O que você recebe
          </h2>
          <ul className="grid gap-4">
            {solucao.entregaveis.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-lg">
                <CheckCircle2
                  className="w-6 h-6 shrink-0 mt-0.5"
                  style={{ color: accent.iconColor }}
                />
                <span className="text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA CENTRAL */}
      <section className="px-[5%] py-20" style={{ background: "var(--brand-dark)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5">
            Quer saber se essa solução é para você?
          </h2>
          <p className="text-lg text-white/75 mb-8">
            Comece pelo diagnóstico. Em 45 dias você sabe exatamente onde está travando — e qual é o caminho.
          </p>
          <Link
            to="/diagnostico"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition hover:opacity-90"
            style={{ background: accent.barTop }}
          >
            Fazer diagnóstico gratuito <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SOLUÇÕES RELACIONADAS */}
      {relacionadas.length > 0 && (
        <section className="px-[5%] py-20" style={{ background: "var(--brand-page)" }}>
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-3xl font-semibold mb-10" style={{ color: "var(--brand-dark)" }}>
              Outras soluções que podem ajudar
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relacionadas.map((rel) => {
                const relAccent = ACCENT_STYLES[rel.accentColor];
                const RelIcon = rel.icon;
                return (
                  <Link
                    key={rel.slug}
                    to="/solucoes/$slug"
                    params={{ slug: rel.slug }}
                    className="group relative p-6 rounded-2xl bg-white border border-black/5 hover:shadow-lg transition overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: relAccent.barTop }}
                    />
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                      style={{ background: relAccent.iconBg }}
                    >
                      <RelIcon className="w-6 h-6" style={{ color: relAccent.iconColor }} />
                    </div>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {rel.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {rel.cardDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
