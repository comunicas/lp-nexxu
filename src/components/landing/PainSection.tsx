import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PAINS = [
  {
    title: "Você é o gargalo",
    desc: "Não tira um dia sem o celular vibrar. A empresa parou porque tudo precisa passar por você.",
  },
  {
    title: "O time vai. Você fica.",
    desc: "Enquanto todos saem no horário, você ainda está resolvendo o que eles não conseguem.",
  },
  {
    title: "Mês bom, mês ruim — sem saber por quê.",
    desc: "Sem dado confiável, qualquer decisão é um chute. Você opera no achismo.",
  },
  {
    title: "Contratou. O caos voltou.",
    desc: "Software, gerente, consultoria. A bagunça sempre retorna. O problema é o processo — não quem.",
  },
  {
    title: "Crescer virou ameaça.",
    desc: "Você sabe que escalar do jeito que está vai quebrar tudo. Mais cliente, mais caos.",
  },
  {
    title: "Usou IA. O caos continuou.",
    desc: "Ferramenta nova, processo velho. A IA só fez o ruim acontecer mais rápido. Era de se esperar.",
  },
];

export function PainSection() {
  return (
    <section className="bg-[var(--brand-page)] px-[5%] py-24">
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          label="VOCÊ SE RECONHECE?"
          labelColor="var(--brand-blue)"
          title="Parece familiar?"
          description=""
        />

        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(83,74,183,0.2)] bg-[rgba(83,74,183,0.06)]">
            <span className="text-[13px] font-bold text-[var(--brand-purple)]">Bombeiro-Chefe</span>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p) => (
            <div
              key={p.title}
              className="group p-7 rounded-3xl bg-white border border-[rgba(24,95,165,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,95,165,0.45)]"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
            >
              <h3 className="text-[17px] font-bold text-[var(--brand-text)] mb-2.5 tracking-tight">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed m-0">{p.desc}</p>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="col-span-full p-7 rounded-3xl border border-[rgba(83,74,183,0.25)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            style={{
              background: "linear-gradient(135deg,rgba(24,95,165,.06),rgba(83,74,183,.08))",
            }}
          >
            <p className="text-base font-bold text-[var(--brand-text)] leading-snug m-0 max-w-[480px]">
              O problema nunca foi esforço.{" "}
              <span className="grad-text">Foi processo.</span>{" "}
              A gente organiza isso em 90 dias.
            </p>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-1.5 font-display font-bold transition-all duration-200 px-6 py-3.5 rounded-xl text-white text-sm bg-brand-gradient shadow-brand-glow-sm whitespace-nowrap hover:opacity-90 shrink-0"
            >
              Descobrir meu nível operacional →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
