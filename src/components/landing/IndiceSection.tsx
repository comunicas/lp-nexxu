import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const LEVELS = [
  {
    num: "01",
    name: "Caos",
    desc: "Opera no improviso total. Cada dia é uma surpresa. Implementar IA aqui não resolve — só automatiza a bagunça.",
    border: "#EF9F27",
    glow: "rgba(239,159,39,0.3)",
  },
  {
    num: "02",
    name: "Reativo",
    desc: "Apaga incêndio com mais eficiência. Melhora aos trancos. IA nesse nível acelera o problema — não elimina.",
    border: "rgba(175,169,236,0.4)",
    glow: "rgba(83,74,183,0.2)",
  },
  {
    num: "03",
    name: "Estruturado",
    desc: "Processos existem e o time os segue. Crescer ainda assusta. É aqui que a IA começa a fazer sentido real.",
    border: "rgba(24,95,165,0.5)",
    glow: "rgba(24,95,165,0.25)",
  },
  {
    num: "04",
    name: "Autônoma",
    desc: "A empresa funciona sem o dono. IA amplifica o que já funciona. O dono lidera — não opera.",
    border: "#5DCAA5",
    glow: "rgba(93,202,165,0.3)",
  },
];

export function IndiceSection() {
  return (
    <section
      id="diagnostico"
      aria-labelledby="indice-title"
      className="bg-[var(--brand-dark)] px-[5%] py-24"
    >
      <div className="max-w-[960px] mx-auto">
        <SectionHeader
          titleId="indice-title"
          label="ÍNDICE ORDEM™"
          labelColor="rgba(175,169,236,0.7)"
          title={
            <span className="text-white">
              Em qual nível está sua operação{" "}
              <span className="grad-text-pale">antes de qualquer IA?</span>
            </span>
          }
          description={
            <span className="text-white/65">
              IA só faz sentido a partir do nível 3. Implementar antes disso não resolve — só
              escala o problema mais rápido e de forma mais cara.
            </span>
          }
        />

        <ol
          aria-label="Níveis de maturidade operacional"
          className="list-none p-0 grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-14"
        >
          {LEVELS.map((l, i) => {
            const delay = ["", "animation-delay-100", "animation-delay-200", "animation-delay-300"][i] ?? "";
            return (
              <li
                key={l.num}
                aria-labelledby={`level-${i}-name`}
                className={`p-7 rounded-3xl bg-white/[0.025] transition-[background,box-shadow] duration-200 hover:bg-white/[0.05] animate-fade-up ${delay}`}
                style={
                  {
                    border: `1px solid ${l.border}`,
                    "--lvl-glow": l.glow,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 28px ${l.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="text-xs font-bold text-white/45 tracking-widest mb-2.5">
                  <span className="sr-only">Nível </span>
                  {l.num}
                </div>
                <h3
                  id={`level-${i}-name`}
                  className="text-[22px] font-extrabold text-white mb-3 tracking-tight"
                >
                  {l.name}
                </h3>
                <p className="text-[13px] text-white/65 leading-relaxed m-0">{l.desc}</p>
              </li>
            );
          })}
        </ol>

        <div
          className="p-9 rounded-[28px] flex items-center justify-between flex-wrap gap-6 border border-[rgba(83,74,183,0.3)]"
          style={{
            background: "rgba(83,74,183,0.1)",
            boxShadow: "0 0 40px rgba(83,74,183,.15)",
          }}
        >
          <div>
            <h3 className="text-[22px] font-extrabold text-white m-0 mb-2">
              Descubra seu nível antes de investir em qualquer ferramenta ou IA
            </h3>
            <p className="text-[15px] text-white/70 m-0 max-w-[460px] leading-relaxed">
              Em 10 perguntas, o Índice ORDEM™ mapeia em qual nível sua operação está hoje e qual
              próximo passo faz sentido — sem pitch e sem pressão de venda.
            </p>
          </div>
          <Link
            to="/diagnostico"
            aria-label="Fazer diagnóstico operacional gratuito"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-8 py-4 rounded-2xl text-white text-[15px] bg-brand-gradient shrink-0 hover:-translate-y-0.5 focus-ring"
            style={{ boxShadow: "0 0 28px rgba(83,74,183,.55)" }}
          >
            <span>Fazer diagnóstico gratuito</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
