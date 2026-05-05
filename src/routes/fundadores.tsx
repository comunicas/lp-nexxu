import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import FoundersSection from "@/components/landing/FoundersSection";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/fundadores")({
  head: () => ({
    meta: [
      { title: "Fundadores | Nexxu — Flávio Horita e Rafael Bruno" },
      {
        name: "description",
        content:
          "Conheça Flávio Horita e Rafael Bruno, fundadores da Nexxu. Anos dentro de uma das maiores plataformas digitais do Brasil aplicados em consultoria de processo e IA para PME.",
      },
      { property: "og:title", content: "Fundadores | Nexxu" },
      {
        property: "og:description",
        content:
          "Quem está por trás do Método ORDEM™: Flávio Horita e Rafael Bruno.",
      },
      { property: "og:url", content: "https://nexxulab.com/fundadores" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://nexxulab.com/fundadores" }],
  }),
  component: Fundadores,
});

function Fundadores() {
  return (
    <main>
      <Nav />
      <FoundersSection />
      <Footer />
    </main>
  );
}
