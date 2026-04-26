import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { PainSection } from "@/components/landing/PainSection";
import { OrdemMethod } from "@/components/landing/OrdemMethod";
import { Products } from "@/components/landing/Products";
import { IndiceSection } from "@/components/landing/IndiceSection";
import { CasesSection } from "@/components/landing/CasesSection";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexxu — Criatividade. Processo. Tecnologia." },
      {
        name: "description",
        content:
          "Consultoria de inovação operacional. Em 90 dias, sua empresa para de depender de você e começa a operar com clareza, rotina e resultado previsível.",
      },
      { property: "og:title", content: "Nexxu — Criatividade. Processo. Tecnologia." },
      {
        property: "og:description",
        content:
          "Em 90 dias, sua operação para de depender de você. Metodologia ORDEM™ proprietária da Nexxu.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <PainSection />
      <OrdemMethod />
      <Products />
      <IndiceSection />
      <CasesSection />
      <Faq />
      <Footer />
    </main>
  );
}
