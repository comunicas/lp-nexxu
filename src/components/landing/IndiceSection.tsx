import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const LEVELS = [
  {
    num: "01",
    name: "Caótica",
    desc: "0–25%. Cada dia é uma surpresa. Você está em todo lugar ao mesmo tempo — e nada resolve sem você.",
    border: "#EF9F27",
    glow: "rgba(239,159,39,0.3)",
  },
  {
    num: "02",
    name: "Organizada",
    desc: "26–50%. Existe estrutura inicial e algumas rotinas. Mas o que importa ainda passa por você.",
    border: "rgba(175,169,236,0.4)",
    glow: "rgba(83,74,183,0.2)",
  },
  {
    num: "03",
    name: "Inteligente",
    desc: "51–75%. O time segue o processo e há dado. Mas escalar ainda exige esforço manual.",
    border: "rgba(24,95,165,0.5)",
    glow: "rgba(24,95,165,0.25)",
  },
  {
    num: "04",
    name: "Autônoma",
    desc: "76–100%. A empresa funciona sem você no centro. Decisões acontecem com dado. Você lidera.",
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
              Em qual nível{" "}
              <span className="grad-text-pale">sua empresa está?</span>
            </span>
          }
          description={
            <span className="text-white/50">
              A maioria dos donos descobre que está no Nível 1 ou 2.{" "}
              Em qual você está?
            </span>
          }
        />

        <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {LEVELS.map((l) => (
            <div
              key={l.num}
              className="p-5 rounded-3xl bg-white/[0.025] transition-all duration-200 hover:bg-white/[0.04]"
              style={{ border: `1px solid ${l.border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 28px ${l.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="text-xs font-bold text-white/55 tracking-widest mb-2.5">{l.num}</div>
              <div className="text-[22px] font-extrabold text-white mb-3 tracking-tight">
                {l.name}
              </div>
              <p className="text-[13px] text-white/50 leading-relaxed m-0">{l.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="p-7 rounded-[28px] flex items-center justify-between flex-wrap gap-6 border border-[rgba(83,74,183,0.3)]"
          style={{
            background: "rgba(83,74,183,0.1)",
            boxShadow: "0 0 40px rgba(83,74,183,.15)",
          }}
        >
          <div>
            <h3 className="text-[22px] font-extrabold text-white m-0 mb-2">
              Descubra seu nível agora.
            </h3>
            <p className="text-[15px] text-white/55 m-0 max-w-[420px] leading-relaxed">
              Responda 10 perguntas em 3 minutos e receba seu Índice ORDEM™ — com o próximo passo
              recomendado para a sua operação.
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
