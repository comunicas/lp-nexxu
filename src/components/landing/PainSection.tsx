import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PAINS = [
  {
    title: "Nenhuma decisão sai sem você",
    desc: "Você não consegue tirar nem um dia de folga sem o celular vibrar. A empresa parou de crescer porque você é o gargalo.",
  },
  {
    title: "Você é o primeiro a entrar e o último a sair",
    desc: "Enquanto o time vai embora no horário, você ainda está resolvendo o que eles não conseguem resolver sozinhos.",
  },
  {
    title: "Você toma decisão no achismo",
    desc: "Mês bom, mês ruim — você não sabe por quê. Sem dado confiável, qualquer decisão é um chute.",
  },
  {
    title: "Contratou. O problema ficou.",
    desc: "Já tentou software, consultoria, novo gerente. A bagunça sempre volta. Porque o problema nunca foi quem — foi o processo.",
  },
  {
    title: "Mais cliente, mais caos",
    desc: "Você sabe que escalar do jeito que está vai quebrar tudo. Crescer virou ameaça, não oportunidade.",
  },
  {
    title: "Já usou IA. O caos continuou.",
    desc: "Ferramentas novas, processo velho. A IA não resolveu — só fez o ruim acontecer mais rápido. Era de se esperar.",
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
          description="Se você chegou até aqui, provavelmente já tentou de tudo. Ferramenta nova. Novo funcionário. Talvez até IA. O problema não é você — é a sequência errada."
        />

        <div className="mb-12 max-w-[640px]">
          <p className="text-[15px] text-[var(--brand-muted)] leading-relaxed">
            Tem um perfil que a gente vê toda semana.{" "}
            <span className="font-bold text-[var(--brand-text)]">Chamamos de Bombeiro-Chefe.</span>{" "}
            É dono. É competente. Trabalha mais que todo o time junto.
            E está preso na operação porque ninguém montou o sistema ainda.
            Você se reconhece em algum desses?
          </p>
        </div>

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
              <span className="grad-text">Tem problema de sequência.</span> Processo primeiro. IA
              quando fizer sentido. A gente organiza isso em 90 dias."
            </p>
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-1.5 font-display font-bold transition-all duration-200 px-5 py-3 rounded-xl text-white text-sm bg-brand-gradient shadow-brand-glow-sm w-fit hover:opacity-90"
            >
              Descobrir meu nível operacional — gratuito →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
