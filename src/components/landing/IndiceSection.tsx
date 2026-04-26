import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const LEVELS = [
  {
    num: "01",
    name: "Caos",
    desc: "Opera no improviso total. Cada dia é uma surpresa — boa ou ruim. Você está em todos os lugares ao mesmo tempo.",
    border: "#EF9F27",
    glow: "rgba(239,159,39,0.3)",
  },
  {
    num: "02",
    name: "Reativo",
    desc: "Apaga incêndio com mais eficiência. Sente que melhora, mas continua dependente de você para tudo que importa.",
    border: "rgba(175,169,236,0.4)",
    glow: "rgba(83,74,183,0.2)",
  },
  {
    num: "03",
    name: "Estruturado",
    desc: "Processos existem e o time os segue. Mas crescer ainda assusta — a estrutura não escala sem fricção.",
    border: "rgba(24,95,165,0.5)",
    glow: "rgba(24,95,165,0.25)",
  },
  {
    num: "04",
    name: "Autônoma",
    desc: "A empresa funciona sem depender do dono. Decisões acontecem com dado. O dono lidera — não opera.",
    border: "#5DCAA5",
    glow: "rgba(93,202,165,0.3)",
  },
];

export function IndiceSection() {
  return (
    <section id="diagnostico" className="bg-[var(--brand-dark)] px-[5%] py-24">
      <div className="max-w-[960px] mx-auto">
        <SectionHeader
          label="ÍNDICE ORDEM™"
          labelColor="rgba(175,169,236,0.7)"
          title={
            <span className="text-white">
              Em qual nível está
              <br />
              <span className="grad-text-pale">sua operação hoje?</span>
            </span>
          }
          description={
            <span className="text-white/50">
              Toda empresa está em algum nível. Saber onde você está é o primeiro passo para sair de
              lá.
            </span>
          }
        />

        <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {LEVELS.map((l) => (
            <div
              key={l.num}
              className="p-7 rounded-3xl bg-white/[0.025] transition-all duration-200 hover:bg-white/[0.04]"
              style={{ border: `1px solid ${l.border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 28px ${l.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="text-xs font-bold text-white/30 tracking-widest mb-2.5">{l.num}</div>
              <div className="text-[22px] font-extrabold text-white mb-3 tracking-tight">
                {l.name}
              </div>
              <p className="text-[13px] text-white/50 leading-relaxed m-0">{l.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="p-9 rounded-[28px] flex items-center justify-between flex-wrap gap-6 border border-[rgba(83,74,183,0.3)]"
          style={{
            background: "rgba(83,74,183,0.1)",
            boxShadow: "0 0 40px rgba(83,74,183,.15)",
          }}
        >
          <div>
            <h3 className="text-[22px] font-extrabold text-white m-0 mb-2">
              Descubra seu Índice ORDEM™
            </h3>
            <p className="text-[15px] text-white/55 m-0 max-w-[420px] leading-relaxed">
              Em 15 minutos de conversa, mapeamos onde sua operação está e o que faz sentido fazer
              primeiro.
            </p>
          </div>
          <Link
            to="/diagnostico"
            className="inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 px-8 py-4 rounded-2xl text-white text-[15px] bg-brand-gradient shrink-0 hover:-translate-y-0.5"
            style={{ boxShadow: "0 0 28px rgba(83,74,183,.55)" }}
          >
            Fazer diagnóstico gratuito →
          </Link>
        </div>
      </div>
    </section>
  );
}
