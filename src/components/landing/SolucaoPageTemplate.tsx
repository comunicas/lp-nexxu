import { Link } from "@tanstack/react-router";
import { ChevronRight, CheckCircle2, ArrowRight, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import type { SolucaoData } from "@/utils/solucoes-data";
import { ACCENT_STYLES } from "@/utils/accent-styles";

type Props = {
  solucao: SolucaoData;
  relacionadas: SolucaoData[];
};

// Ilustrações SVG geométricas por slug
function SolucaoIlustration({ slug, accentColor }: { slug: string; accentColor: string }) {
  const c = accentColor;

  const svgs: Record<string, React.ReactNode> = {
    "diagnostico-operacional": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="60" cy="70" r="14" fill={c} opacity="0.85" />
        <circle cx="140" cy="70" r="14" fill={c} opacity="0.55" />
        <circle cx="220" cy="70" r="14" fill={c} opacity="0.3" />
        <line x1="74" y1="70" x2="126" y2="70" stroke={c} strokeWidth="2" opacity="0.4" />
        <line x1="154" y1="70" x2="206" y2="70" stroke={c} strokeWidth="2" opacity="0.25" />
        <circle cx="170" cy="150" r="38" fill="none" stroke={c} strokeWidth="3" />
        <line x1="198" y1="178" x2="225" y2="205" stroke={c} strokeWidth="4" strokeLinecap="round" />
        <line x1="158" y1="138" x2="182" y2="162" stroke={c} strokeWidth="2" opacity="0.6" />
        <line x1="182" y1="138" x2="158" y2="162" stroke={c} strokeWidth="2" opacity="0.6" />
        <text x="60" y="105" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">entrada</text>
        <text x="140" y="105" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">processo</text>
        <text x="220" y="105" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">saída</text>
      </svg>
    ),
    "mapeamento-de-processos": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <rect x="20" y="80" width="60" height="60" rx="8" fill="none" stroke={c} strokeWidth="2" />
        <rect x="110" y="80" width="60" height="60" rx="8" fill="none" stroke={c} strokeWidth="2" />
        <rect x="200" y="80" width="60" height="60" rx="8" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
        <line x1="80" y1="110" x2="110" y2="110" stroke={c} strokeWidth="2" />
        <polygon points="110,110 104,106 104,114" fill={c} />
        <line x1="170" y1="110" x2="200" y2="110" stroke={c} strokeWidth="2" />
        <polygon points="200,110 194,106 194,114" fill={c} />
        <line x1="30" y1="95" x2="70" y2="95" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="30" y1="105" x2="60" y2="105" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="30" y1="115" x2="65" y2="115" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="120" y1="95" x2="160" y2="95" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="120" y1="105" x2="150" y2="105" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <line x1="120" y1="115" x2="155" y2="115" stroke={c} strokeWidth="1.5" opacity="0.5" />
        <polyline points="215,110 225,120 245,100" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "implementacao-com-ia": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="140" cy="110" r="32" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" />
        <text x="140" y="115" fill={c} fontSize="16" fontWeight="700" textAnchor="middle">IA</text>
        {[[60, 60], [220, 60], [60, 160], [220, 160], [140, 52]].map(([cx, cy], i) => (
          <g key={i}>
            <line x1="140" y1="110" x2={cx} y2={cy} stroke={c} strokeWidth="1.5" opacity="0.4" />
            <circle cx={cx} cy={cy} r="10" fill="none" stroke={c} strokeWidth="2" />
          </g>
        ))}
        <circle cx="140" cy="110" r="50" fill="none" stroke={c} strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    "mentoria-para-o-dono": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="80" cy="80" r="20" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="2" />
        <rect x="60" y="105" width="40" height="50" rx="6" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" />
        <circle cx="180" cy="100" r="14" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" />
        <rect x="166" y="118" width="28" height="36" rx="5" fill="none" stroke={c} strokeWidth="2" />
        <path d="M 110 130 Q 145 110 165 130" fill="none" stroke={c} strokeWidth="2" strokeDasharray="4 3" />
        <polygon points="165,130 159,126 159,134" fill={c} />
        <polyline points="50,200 100,180 150,170 200,150 250,130" fill="none" stroke={c} strokeWidth="2.5" />
        <circle cx="250" cy="130" r="4" fill={c} />
        <text x="250" y="120" fill={c} fontSize="10" textAnchor="middle" fontWeight="600">70%</text>
      </svg>
    ),
    "kpis-e-gestao-com-dados": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <rect x="40" y="130" width="32" height="60" rx="3" fill={c} fillOpacity="0.4" />
        <rect x="92" y="100" width="32" height="90" rx="3" fill={c} fillOpacity="0.6" />
        <rect x="144" y="80" width="32" height="110" rx="3" fill={c} fillOpacity="0.8" />
        <rect x="196" y="60" width="32" height="130" rx="3" fill={c} />
        <line x1="20" y1="90" x2="260" y2="90" stroke={c} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <text x="260" y="84" fill={c} fontSize="9" textAnchor="end">meta</text>
        <polyline points="56,150 108,120 160,100 212,75" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" />
        <polygon points="212,75 206,80 212,86" fill="#fff" opacity="0.6" />
      </svg>
    ),
    "autonomia-operacional": (
      <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
        <circle cx="140" cy="110" r="36" fill="none" stroke={c} strokeWidth="2.5" />
        <circle cx="140" cy="110" r="12" fill={c} fillOpacity="0.3" stroke={c} strokeWidth="2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 140 + 36 * Math.cos(rad);
          const y1 = 110 + 36 * Math.sin(rad);
          const x2 = 140 + 46 * Math.cos(rad);
          const y2 = 110 + 46 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="3" strokeLinecap="round" />;
        })}
        <circle cx="50" cy="50" r="8" fill={c} fillOpacity="0.5" />
        <circle cx="230" cy="50" r="8" fill={c} fillOpacity="0.5" />
        <circle cx="50" cy="170" r="8" fill={c} fillOpacity="0.5" />
        <circle cx="230" cy="170" r="8" fill={c} fillOpacity="0.5" />
      </svg>
    ),
  };

  return (
    <div className="w-full max-w-md mx-auto opacity-90">
      {svgs[slug] ?? (
        <svg viewBox="0 0 280 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="280" height="220" rx="16" fill="rgba(255,255,255,0.03)" />
          <circle cx="140" cy="110" r="60" fill="none" stroke={c} strokeWidth="2" />
          <circle cx="140" cy="110" r="36" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" />
          <circle cx="140" cy="110" r="12" fill={c} />
          <line x1="60" y1="110" x2="220" y2="110" stroke={c} strokeWidth="1" opacity="0.3" />
          <line x1="140" y1="40" x2="140" y2="180" stroke={c} strokeWidth="1" opacity="0.3" />
        </svg>
      )}
    </div>
  );
}

export function SolucaoPageTemplate({ solucao, relacionadas }: Props) {
  const accent = ACCENT_STYLES[solucao.accentColor];
  const Icon = solucao.icon;
  const accentColorValue = accent.iconColor;

  return (
    <>
      <Nav />

      {/* ── HERO SPLIT ────────────────────────────────────── */}
      <section className="relative bg-[var(--brand-navy,#0B1220)] text-white overflow-hidden pt-28 pb-20">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(60% 50% at 30% 20%, ${accentColorValue} 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Coluna esquerda */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[12px] text-white/60 mb-6">
              <Link to="/" className="hover:text-white transition">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/" hash="solucoes" className="hover:text-white transition">Soluções</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{solucao.title}</span>
            </nav>

            {/* Badge fase ORDEM */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-6 border"
              style={{
                background: `color-mix(in oklab, ${accentColorValue} 15%, transparent)`,
                borderColor: `color-mix(in oklab, ${accentColorValue} 35%, transparent)`,
                color: "#fff",
              }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color: accentColorValue }} />
              <span>Método ORDEM™ · {solucao.faseOrdem}</span>
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              {solucao.title}
            </h1>

            {/* Tagline com borda colorida */}
            <p
              className="text-lg md:text-xl text-white/80 leading-relaxed pl-4 border-l-2 mb-8"
              style={{ borderColor: accentColorValue }}
            >
              {solucao.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/diagnostico"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold text-white transition hover:opacity-90"
                style={{ background: accentColorValue }}
              >
                Quero fazer meu diagnóstico <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                hash="solucoes"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-semibold text-white/90 border border-white/20 hover:bg-white/5 transition"
              >
                Ver todas as soluções <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Coluna direita — Ilustração */}
          <div className="flex items-center justify-center">
            <SolucaoIlustration slug={solucao.slug} accentColor={accentColorValue} />
          </div>
        </div>
      </section>

      {/* ── VOCÊ SE RECONHECE AQUI? ───────────────────────── */}
      <section className="bg-[var(--surface-soft,#F7F8FA)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-strong,#0B1220)] mb-3">
            Você se reconhece aqui?
          </h2>
          <p className="text-center text-[15px] text-[var(--text-muted,#5B6470)] max-w-2xl mx-auto mb-12">
            {solucao.paraQuem}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {solucao.sintomas.map((sintoma, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-50">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-[14px] leading-relaxed text-[var(--text-strong,#0B1220)]">
                  {sintoma}
                </p>
              </div>
            ))}
          </div>

          {/* O problema */}
          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-center text-[16px] md:text-[17px] leading-relaxed text-[var(--text-muted,#5B6470)] italic">
              {solucao.oProblema}
            </p>
          </div>
        </div>
      </section>

      {/* ── COMO A NEXXU RESOLVE ──────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-strong,#0B1220)] mb-12">
            Como a Nexxu resolve — em {solucao.comoFunciona.length} passos
          </h2>

          {/* Steps — horizontal no desktop com conector, vertical no mobile */}
          <div className="relative">
            {/* Linha conectora horizontal (só desktop) */}
            <div
              className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px"
              style={{
                background: `linear-gradient(to right, transparent, ${accentColorValue}, transparent)`,
                opacity: 0.4,
              }}
            />
            <div
              className={`relative grid grid-cols-1 lg:grid-cols-${solucao.comoFunciona.length} gap-8`}
              style={{
                gridTemplateColumns:
                  typeof window !== "undefined"
                    ? undefined
                    : `repeat(${solucao.comoFunciona.length}, minmax(0, 1fr))`,
              }}
            >
              {solucao.comoFunciona.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  {/* Número */}
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold text-white mb-5 z-10"
                    style={{ background: accentColorValue }}
                  >
                    {String(item.step).padStart(2, "0")}
                  </div>
                  {/* Card */}
                  <div className="bg-[var(--surface-soft,#F7F8FA)] rounded-2xl p-6 border border-black/5 w-full">
                    <h3 className="text-[16px] font-semibold text-[var(--text-strong,#0B1220)] mb-2">
                      {item.titulo}
                    </h3>
                    <p className="text-[14px] text-[var(--text-muted,#5B6470)] leading-relaxed">
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── O QUE ESTÁ NA MESA AO FINAL ──────────────────── */}
      <section className="bg-[var(--surface-soft,#F7F8FA)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-strong,#0B1220)] mb-12">
            O que está na mesa ao final
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solucao.entregaveis.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: accent.iconBg }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: accentColorValue }} />
                </div>
                <p className="text-[15px] leading-relaxed text-[var(--text-strong,#0B1220)] pt-1.5">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ───────────────────────────────────── */}
      <section className="bg-[var(--brand-navy,#0B1220)] text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Stat visual */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[12px] font-semibold mb-8">
            <span className="text-white/70">Método ORDEM™</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span style={{ color: accentColorValue }}>Processo antes de IA</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Pronto para sair do improviso?
          </h2>
          <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            O diagnóstico é o ponto de partida. Saída do caos, não milagre.
            Em 45 dias você sabe exatamente onde está travando — e qual caminho faz sentido.
          </p>
          <Link
            to="/diagnostico"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-semibold text-white transition hover:opacity-90"
            style={{ background: accentColorValue }}
          >
            Quero fazer meu diagnóstico <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── SOLUÇÕES RELACIONADAS ─────────────────────────── */}
      {relacionadas.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-strong,#0B1220)]">
                Continue construindo a estrutura
              </h2>
              <Link
                to="/"
                hash="solucoes"
                className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-blue)] hover:underline"
              >
                Ver todas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relacionadas.map((rel) => {
                const relAccent = ACCENT_STYLES[rel.accentColor];
                const RelIcon = rel.icon;
                return (
                  <Link
                    key={rel.slug}
                    to="/solucoes/$slug"
                    params={{ slug: rel.slug }}
                    className="group relative bg-white rounded-2xl p-6 border border-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: relAccent.barTop }}
                    />
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 mt-2"
                      style={{ background: relAccent.iconBg }}
                    >
                      <RelIcon className="w-5 h-5" style={{ color: relAccent.iconColor }} />
                    </div>
                    <h3 className="text-[16px] font-semibold text-[var(--text-strong,#0B1220)] mb-2">
                      {rel.title}
                    </h3>
                    <p className="text-[13.5px] text-[var(--text-muted,#5B6470)] leading-relaxed mb-4">
                      {rel.cardDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand-blue)]">
                      Ver solução
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
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
