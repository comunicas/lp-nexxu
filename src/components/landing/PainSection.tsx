import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PAINS = [
  {
    title: "Tudo trava sem você",
    desc: "Nenhuma decisão sai sem a sua aprovação. Você virou o gargalo da própria empresa.",
  },
  {
    title: "Você trabalha mais que o time",
    desc: "Entra cedo, sai tarde, trabalha no fim de semana. E ainda sente que está sempre atrasado.",
  },
  {
    title: "Os números variam sem explicação",
    desc: "Meses bons e ruins se alternam sem você entender o padrão. Decisão no achismo.",
  },
  {
    title: "Já contratou, mas o problema voltou",
    desc: "Nova pessoa, mesma bagunça. Porque o problema nunca foi quem — foi o processo.",
  },
  {
    title: "Crescer assusta mais do que motiva",
    desc: "Você sabe que mais cliente significa mais caos. Escalar parece risco, não oportunidade.",
  },
];

export function PainSection() {
  return (
    <section className="bg-[var(--brand-page)] px-[5%] py-24">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="VOCÊ SE RECONHECE?"
          labelColor="var(--brand-blue)"
          title={
            <>
              O negócio cresceu.
              <br />
              O caos também.
            </>
          }
          description="Se você chegou até aqui, provavelmente já tentou de tudo. O problema não é você."
        />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p) => (
            <div
              key={p.title}
              className="group p-7 rounded-3xl bg-white border border-[rgba(24,95,165,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,95,165,0.45)]"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
            >
              <div
                className="w-2 h-2 rounded-full bg-brand-gradient mb-5 transition-shadow duration-300 group-hover:shadow-brand-glow-sm"
              />
              <h3 className="text-[17px] font-bold text-[var(--brand-text)] mb-2.5 tracking-tight">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed m-0">{p.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="p-7 rounded-3xl border border-[rgba(83,74,183,0.25)] flex flex-col justify-center"
            style={{
              background:
                "linear-gradient(135deg,rgba(24,95,165,.06),rgba(83,74,183,.08))",
            }}
          >
            <p className="text-base font-bold text-[var(--brand-text)] leading-snug mb-5">
              "Você não tem problema de esforço.{" "}
              <span className="grad-text">Tem problema de processo.</span> A gente organiza isso em
              90 dias."
            </p>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-1.5 font-display font-bold transition-all duration-200 px-5 py-3 rounded-xl text-white text-sm bg-brand-gradient shadow-brand-glow-sm w-fit hover:opacity-90"
            >
              Fazer diagnóstico gratuito →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
