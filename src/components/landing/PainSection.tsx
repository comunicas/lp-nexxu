import { Link } from "@tanstack/react-router";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";

const PAINS = [
  {
    title: "Você é o sistema operacional da empresa",
    desc: "Sem você, nada acontece. Cada decisão, cada aprovação, cada exceção passa por você. Isso não é liderança — é sequestro operacional.",
  },
  {
    title: "Você cresce e o caos escala junto",
    desc: "Mais clientes, mais erros, mais incêndio. A empresa cresceu, mas o processo não. Escalar do jeito atual vai quebrar tudo — e você sabe disso.",
  },
  {
    title: "Você decide no achismo porque não tem dado confiável",
    desc: "O extrato bancário não é painel de gestão. Sem indicadores reais, você reage ao que aparece — não ao que importa.",
  },
  {
    title: "Você já contratou, implementou, tentou. O problema voltou.",
    desc: "CRM, consultoria, novo gerente, curso de gestão. A bagunça sempre volta porque o problema nunca foi a ferramenta — foi o processo.",
  },
  {
    title: "Sua equipe não executa sem você confirmar",
    desc: "A delegação quebra porque não existe padrão. Cada pessoa faz do seu jeito. Retrabalho, erros e dependência crônica do dono para tudo.",
  },
  {
    title: "Você implementou IA. O caos ficou mais rápido.",
    desc: "Automação em processo ruim não resolve — multiplica o erro. IA não conserta o que está quebrado. Processo vem antes. Sempre.",
  },
];

export function PainSection() {
  return (
    <section
      aria-labelledby="pain-title"
      className="bg-[var(--brand-page)] px-[5%] py-24"
    >
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          titleId="pain-title"
          label="VOCÊ SE RECONHECE?"
          labelColor="var(--brand-blue)"
          title={
            <>
              Cresceu o faturamento.
              <br />
              Cresceu o caos junto.
            </>
          }
          description="Não é falta de esforço, de ferramenta ou de equipe. É ausência de processo. E IA em processo ruim só acelera o problema."
        />

        <ul
          aria-label="Sintomas comuns de operação sem processo"
          className="list-none p-0 m-0 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PAINS.map((p, i) => (
            <li key={p.title}>
              <article
                aria-labelledby={`pain-${i}`}
                className="group h-full p-7 rounded-3xl bg-white border border-[rgba(24,95,165,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,95,165,0.45)]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
              >
                <div
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-brand-gradient mb-5 transition-all duration-300 group-hover:scale-150 group-hover:shadow-brand-glow-sm"
                />
                <h3
                  id={`pain-${i}`}
                  className="text-[17px] font-bold text-[var(--brand-text)] mb-2.5 tracking-tight"
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--brand-muted)] leading-relaxed m-0">{p.desc}</p>
              </article>
            </li>
          ))}

          {/* CTA card */}
          <li>
            <div
              className="h-full p-7 rounded-3xl border border-[rgba(83,74,183,0.25)] flex flex-col justify-center"
              style={{
                background:
                  "linear-gradient(135deg,rgba(24,95,165,.06),rgba(83,74,183,.08))",
              }}
            >
              <p className="section-label grad-text mb-3 text-[12px]">
                O diagnóstico começa aqui
              </p>
              <p className="text-base font-bold text-[var(--brand-text)] leading-snug mb-3">
                "Você não tem problema de esforço.{" "}
                <span className="grad-text">Tem problema de sequência.</span>{" "}
                Processo. Rotina. Dados. IA — nessa ordem."
              </p>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed mb-5">
                O Método ORDEM™ organiza isso em 90 dias, com entregáveis reais e sem hype de
                transformação digital.
              </p>
              <Link
                to="/diagnostico"
                aria-label="Fazer diagnóstico operacional gratuito"
                className="inline-flex items-center justify-center gap-1.5 font-display font-bold transition-all duration-200 px-5 py-3 rounded-xl text-white text-sm bg-brand-gradient shadow-brand-glow-sm w-fit hover:opacity-90 focus-ring-light"
              >
                <span>Fazer diagnóstico gratuito</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
