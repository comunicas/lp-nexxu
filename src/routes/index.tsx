import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { PainSection } from "@/components/landing/PainSection";
import { OrdemMethod } from "@/components/landing/OrdemMethod";
import { Products } from "@/components/landing/Products";
import { SolucoesSection } from "@/components/landing/SolucoesSection";
import { IndiceSection } from "@/components/landing/IndiceSection";
import { CasesSection } from "@/components/landing/CasesSection";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const OG_IMAGE_URL = "https://nexxulab.com/og-nexxu.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexxu | Consultoria de Processo e IA para PME — Resultados em 90 Dias" },
      {
        name: "description",
        content:
          "Nexxu organiza sua operação antes de qualquer IA. Método ORDEM™: processo, rotinas e dados primeiro — IA depois, quando vale a pena. Para donos de PME com R$20k+/mês que querem parar de apagar incêndio em 90 dias.",
      },
      { property: "og:title", content: "Nexxu | Processo antes de IA. Sempre." },
      {
        property: "og:description",
        content:
          "Consultoria de inovação operacional para PME. Método ORDEM™: organização, rotinas e dados antes de IA. Resultados em 90 dias.",
      },
      { property: "og:url", content: "https://nexxulab.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nexxu | Processo antes de IA. Sempre." },
      {
        name: "twitter:description",
        content:
          "Consultoria de inovação operacional para PME. Em 90 dias, sua empresa para de depender de você.",
      },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: "https://nexxulab.com/" }],
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
      <SolucoesSection />
      <Products />
      <IndiceSection />
      <CasesSection />
      <Faq />
      <Footer />
    </main>
  );
}
