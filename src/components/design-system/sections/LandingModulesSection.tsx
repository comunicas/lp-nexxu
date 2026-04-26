import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { PainSection } from "@/components/landing/PainSection";
import { OrdemMethod } from "@/components/landing/OrdemMethod";
import { Products } from "@/components/landing/Products";
import { IndiceSection } from "@/components/landing/IndiceSection";
import { CasesSection } from "@/components/landing/CasesSection";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { DSSection } from "../DSSection";
import { DSPreview } from "../DSPreview";

export function LandingModulesSection() {
  return (
    <DSSection
      id="modulos-landing"
      title="Módulos da Landing"
      description="Cada bloco de src/components/landing/ renderizado em ambiente isolado para inspeção."
    >
      <DSPreview
        name="Nav"
        path="landing/Nav"
        description="Nav fixo com fundo dinâmico no scroll."
        background="dark"
        isolate
      >
        <div className="relative h-20">
          <Nav />
        </div>
      </DSPreview>

      <DSPreview
        name="Hero"
        path="landing/Hero"
        description="Seção principal com gradientes ambientais e CTAs."
        background="dark"
      >
        <div className="[&>section]:!min-h-0 [&>section]:!py-16">
          <Hero />
        </div>
      </DSPreview>

      <DSPreview
        name="PainSection"
        path="landing/PainSection"
        description="5 cards de dor + CTA gradiente."
      >
        <PainSection />
      </DSPreview>

      <DSPreview
        name="OrdemMethod"
        path="landing/OrdemMethod"
        description="Letras O·R·D·E·M interativas com timeline."
      >
        <OrdemMethod />
      </DSPreview>

      <DSPreview
        name="Products"
        path="landing/Products"
        description="Grid de 4 tiers com variantes light, featured e dark."
        background="white"
      >
        <Products />
      </DSPreview>

      <DSPreview
        name="IndiceSection"
        path="landing/IndiceSection"
        description="Grid Índice ORDEM™ com glow por nível."
      >
        <IndiceSection />
      </DSPreview>

      <DSPreview
        name="CasesSection"
        path="landing/CasesSection"
        description="Métricas e depoimentos."
      >
        <CasesSection />
      </DSPreview>

      <DSPreview
        name="Faq"
        path="landing/Faq"
        description="Accordion controlado, um item aberto por vez."
        background="white"
      >
        <Faq />
      </DSPreview>

      <DSPreview
        name="Footer"
        path="landing/Footer"
        description="Rodapé dark com logo e contato."
        background="dark"
      >
        <Footer />
      </DSPreview>
    </DSSection>
  );
}
