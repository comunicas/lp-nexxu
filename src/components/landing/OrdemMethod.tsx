import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { cn } from "@/lib/utils";

const LETTERS = [
  {
    letter: "O",
    short: "Organiz.",
    name: "Organização",
    desc: "Antes de qualquer ferramenta ou IA, mapeamos o que realmente acontece na sua operação — quem faz, como faz, onde trava. Nada muda antes de estar claro no papel.",
  },
  {
    letter: "R",
    short: "Rotinas",
    name: "Rotinas",
    desc: "Transformamos o caos em rotinas que funcionam sem você precisar lembrar de tudo. O time opera. Você gerencia.",
  },
  {
    letter: "D",
    short: "Dados",
    name: "Dados",
    desc: "Sem dado confiável, qualquer decisão é um chute. Criamos indicadores reais — não dashboards bonitos em cima de processo ruim.",
  },
  {
    letter: "E",
    short: "Eficiência",
    name: "Eficiência IA",
    desc: "Só aqui a IA entra. Depois que o processo está claro, ela multiplica o resultado. Antes disso, ela só escala o problema. Essa sequência é o que diferencia resultado real de hype.",
  },
  {
    letter: "M",
    short: "Maturid.",
    name: "Maturidade",
    desc: "O objetivo final: sua empresa funciona sem depender de você. Processo sólido, dados reais, IA onde faz sentido. Dono lidera — não opera.",
  },
];

const TIMELINE = [
  {
    days: "30 dias",
    title: "Diagnóstico + Mapa",
    desc: "Processos identificados, gargalos mapeados, prioridades definidas. Pela primeira vez, você sabe onde está o problema de verdade.",
    color: "#185FA5",
    bgColor: "rgba(24,95,165,0.1)",
    border: "rgba(24,95,165,0.2)",
  },
  {
    days: "60 dias",
    title: "Rotinas implementadas",
    desc: "Processos críticos rodando sem depender de você lembrar. Time opera com clareza. Primeiros dados confiáveis surgem.",
    color: "#534AB7",
    bgColor: "rgba(83,74,183,0.1)",
    border: "rgba(83,74,183,0.2)",
  },
  {
    days: "90 dias",
    title: "Autonomia operacional",
    desc: "Empresa opera com previsibilidade. Dono lidera — não opera. IA amplificando o que já funciona. Não o oposto.",
    color: "#5DCAA5",
    bgColor: "rgba(93,202,165,0.1)",
    border: "rgba(93,202,165,0.2)",
  },
];

export function OrdemMethod() {
  const [active, setActive] = useState(0);
  const cur = LETTERS[active];
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  // Navegação por setas no tablist
  useEffect(() => {
    tabsRef.current = tabsRef.current.slice(0, LETTERS.length);
  }, []);

  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (i + dir + LETTERS.length) % LETTERS.length;
      setActive(next);
      tabsRef.current[next]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      tabsRef.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = LETTERS.length - 1;
      setActive(last);
      tabsRef.current[last]?.focus();
    }
  };

  return (
    <section
      id="metodo"
      aria-labelledby="metodo-title"
      className="px-[5%] py-24 border-t border-[rgba(83,74,183,0.1)]"
      style={{
        background:
          "linear-gradient(160deg,rgba(83,74,183,.07) 0%,rgba(24,95,165,.05) 50%,var(--brand-page) 100%)",
      }}
    >
      <div className="max-w-[1040px] mx-auto">
        <SectionHeader
          titleId="metodo-title"
          label="METODOLOGIA PROPRIETÁRIA"
          labelColor="var(--brand-purple)"
          title={
            <>
              Método <span className="grad-text">ORDEM™</span>
            </>
          }
          description="Criatividade sem estrutura é improviso. Estrutura sem criatividade é burocracia. IA sem processo é gambiarra cara. A Nexxu faz os três — na ordem certa."
        />

        <div
          role="tablist"
          aria-label="Etapas do Método ORDEM"
          className="flex gap-2.5 justify-center flex-wrap mb-10"
        >
          {LETTERS.map((l, i) => (
            <button
              key={l.letter}
              ref={(el) => { tabsRef.current[i] = el; }}
              role="tab"
              id={`ordem-tab-${i}`}
              type="button"
              aria-selected={active === i}
              aria-controls="ordem-panel"
              tabIndex={active === i ? 0 : -1}
              aria-label={`${l.name} — etapa ${i + 1} do método`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "w-[72px] h-[72px] rounded-3xl border-0 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-0.5 font-display focus-ring-light",
                active === i
                  ? "bg-brand-gradient shadow-brand-glow-sm"
                  : "bg-[rgba(83,74,183,0.08)] hover:bg-[rgba(83,74,183,0.15)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "text-[26px] font-extrabold leading-none",
                  active === i ? "text-white" : "text-[var(--brand-purple)]",
                )}
              >
                {l.letter}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "text-[9px] font-semibold tracking-wide uppercase",
                  active === i ? "text-white/80" : "text-[#8880C0]",
                )}
              >
                {l.short}
              </span>
            </button>
          ))}
        </div>

        <div
          key={cur.letter}
          id="ordem-panel"
          role="tabpanel"
          aria-labelledby={`ordem-tab-${active}`}
          aria-live="polite"
          tabIndex={0}
          className="max-w-[600px] mx-auto px-9 py-8 rounded-[28px] bg-white border border-[rgba(83,74,183,0.2)] text-center animate-scale-in focus-ring-light"
          style={{ boxShadow: "0 0 40px rgba(83,74,183,.1)", marginBottom: 60 }}
        >
          <div aria-hidden="true" className="grad-text text-5xl font-black leading-none mb-1.5">
            {cur.letter}
          </div>
          <h3 className="text-xl font-bold text-[var(--brand-text)] mb-3">{cur.name}</h3>
          <p className="text-[15px] text-[var(--brand-muted)] leading-relaxed m-0">{cur.desc}</p>
        </div>

        <ol
          aria-label="Linha do tempo de 90 dias"
          className="list-none p-0 grid gap-4 grid-cols-1 md:grid-cols-3"
        >
          {TIMELINE.map((t) => (
            <li
              key={t.days}
              className="p-7 rounded-3xl bg-white"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,.04)", border: `1px solid ${t.border}` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: t.bgColor, color: t.color }}
              >
                {t.days}
              </div>
              <h4 className="text-base font-bold text-[var(--brand-text)] mb-2.5">{t.title}</h4>
              <p className="text-sm text-[var(--brand-muted)] leading-relaxed m-0">{t.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
