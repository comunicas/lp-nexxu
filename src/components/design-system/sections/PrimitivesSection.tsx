import type { ReactNode } from "react";
import { Badge } from "@/components/ui-nexxu/Badge";
import { Button } from "@/components/ui-nexxu/Button";
import { CheckIcon } from "@/components/ui-nexxu/CheckIcon";
import { SectionHeader } from "@/components/ui-nexxu/SectionHeader";
import { DSSection } from "../DSSection";

function Block({
  name,
  path,
  description,
  background = "white",
  children,
}: {
  name: string;
  path: string;
  description: string;
  background?: "white" | "dark" | "page";
  children: ReactNode;
}) {
  const bg =
    background === "dark"
      ? "bg-[var(--brand-dark)]"
      : background === "page"
        ? "bg-[var(--brand-page)]"
        : "bg-white";
  return (
    <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] overflow-hidden bg-white mb-6">
      <header className="px-5 py-3 flex items-start justify-between gap-3 border-b border-[rgba(83,74,183,0.08)]">
        <div>
          <h4 className="font-display font-bold text-[15px] text-[var(--brand-text)]">{name}</h4>
          <p className="text-[12px] text-[var(--brand-muted)] mt-0.5">{description}</p>
        </div>
        <code className="text-[11px] font-mono text-[var(--brand-purple)] bg-[rgba(83,74,183,0.08)] px-2 py-1 rounded-md whitespace-nowrap">
          {path}
        </code>
      </header>
      <div className={`p-8 flex flex-wrap items-center gap-4 ${bg}`}>{children}</div>
    </div>
  );
}

export function PrimitivesSection() {
  return (
    <DSSection
      id="primitivos"
      title="Primitivos"
      description="Componentes base do diretório src/components/ui-nexxu/, reutilizados por toda a aplicação."
    >
      <Block
        name="Button"
        path="ui-nexxu/Button"
        description="5 variantes para CTAs, secundários e ghosts em fundo dark."
      >
        <Button variant="primary">Primary</Button>
        <Button variant="sm">Small</Button>
        <Button variant="cta">CTA</Button>
        <Button variant="secondary">Secondary</Button>
      </Block>

      <Block
        name="Button — variant ghost (em fundo dark)"
        path="ui-nexxu/Button"
        description="Para uso sobre o fundo escuro do Hero."
        background="dark"
      >
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary">Primary</Button>
      </Block>

      <Block
        name="Badge — gradient · featured · section-label"
        path="ui-nexxu/Badge"
        description="Tags de seção, destaques e rótulos de produto."
      >
        <Badge variant="gradient">Diagnóstico</Badge>
        <Badge variant="featured">Mais escolhido</Badge>
        <Badge variant="section-label">PRÓXIMO PASSO</Badge>
      </Block>

      <Block
        name="Badge — variant hero (em fundo dark)"
        path="ui-nexxu/Badge"
        description="Pílula com dot teal usada no topo de seções dark."
        background="dark"
      >
        <Badge variant="hero">CONSULTORIA DE INOVAÇÃO OPERACIONAL</Badge>
      </Block>

      <Block
        name="CheckIcon — light"
        path="ui-nexxu/CheckIcon"
        description="Bolinha teal para listas em fundo claro."
      >
        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-[14px]">
            <CheckIcon /> Item validado
          </li>
          <li className="flex items-start gap-3 text-[14px]">
            <CheckIcon /> Outro item validado
          </li>
        </ul>
      </Block>

      <Block
        name="CheckIcon — dark"
        path="ui-nexxu/CheckIcon"
        description="Variante roxo claro para fundos escuros."
        background="dark"
      >
        <ul className="space-y-2">
          <li className="flex items-start gap-3 text-[14px] text-white">
            <CheckIcon variant="dark" /> Item validado
          </li>
          <li className="flex items-start gap-3 text-[14px] text-white">
            <CheckIcon variant="dark" /> Outro item validado
          </li>
        </ul>
      </Block>

      <Block
        name="SectionHeader"
        path="ui-nexxu/SectionHeader"
        description="Cabeçalho padronizado de seção com label opcional."
        background="page"
      >
        <div className="w-full">
          <SectionHeader
            label="MÉTODO"
            title={
              <>
                Operação que <span className="grad-text">não depende</span> de você
              </>
            }
            description="Em 90 dias, estruturamos rotinas, papéis e indicadores."
          />
        </div>
      </Block>
    </DSSection>
  );
}
