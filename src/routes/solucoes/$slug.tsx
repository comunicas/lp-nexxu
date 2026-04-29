import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SolucaoPageTemplate } from "@/components/landing/SolucaoPageTemplate";
import { getSolucaoBySlug, getSolucoesBySlugList } from "@/utils/solucoes-data";

export const Route = createFileRoute("/solucoes/$slug")({
  head: ({ params }) => {
    const solucao = getSolucaoBySlug(params.slug);
    if (!solucao) return {};
    return {
      meta: [
        { title: solucao.metaTitle },
        { name: "description", content: solucao.metaDescription },
        { property: "og:title", content: solucao.metaTitle },
        { property: "og:description", content: solucao.metaDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: solucao.metaTitle },
        { name: "twitter:description", content: solucao.metaDescription },
        {
          property: "og:image",
          content:
            "https://storage.googleapis.com/gpt-engineer-file-uploads/jKnNwvpAIVdBeybAyDS6bLEVBhW2/social-images/social-1777201276438-logo-branco-horizontal.webp",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const solucao = getSolucaoBySlug(params.slug);
    if (!solucao) throw notFound();
    const relacionadas = getSolucoesBySlugList(solucao.relacionadas);
    return { solucao, relacionadas };
  },
  component: function SolucaoPage() {
    const { solucao, relacionadas } = Route.useLoaderData();
    return <SolucaoPageTemplate solucao={solucao} relacionadas={relacionadas} />;
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold mb-2">Erro ao carregar a solução</h1>
      <p className="text-muted-foreground mb-6">{error.message}</p>
      <Link to="/" className="underline">
        Voltar para o início
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold mb-2">Solução não encontrada.</h1>
      <Link to="/" className="underline">
        Voltar para o início
      </Link>
    </div>
  ),
});
