import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SolucaoPageTemplate } from "@/components/landing/SolucaoPageTemplate";
import { getSolucaoBySlug, getSolucoesBySlugList } from "@/utils/solucoes-data";

const OG_IMAGE_URL = "https://nexxulab.com/og-nexxu.svg";

export const Route = createFileRoute("/solucoes/$slug")({
  head: ({ params }) => {
    const solucao = getSolucaoBySlug(params.slug);
    if (!solucao) return {};
    const canonicalUrl = `https://nexxulab.com/solucoes/${params.slug}`;
    return {
      meta: [
        { title: solucao.metaTitle },
        { name: "description", content: solucao.metaDescription },
        { property: "og:title", content: solucao.metaTitle },
        { property: "og:description", content: solucao.metaDescription },
        { property: "og:url", content: canonicalUrl },
        { property: "og:type", content: "website" },
        { property: "og:image", content: OG_IMAGE_URL },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: solucao.metaTitle },
        { name: "twitter:description", content: solucao.metaDescription },
        { name: "twitter:image", content: OG_IMAGE_URL },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  loader: ({ params }) => {
    const solucao = getSolucaoBySlug(params.slug);
    if (!solucao) throw notFound();
    const relacionadas = getSolucoesBySlugList(solucao.relacionadas);
    return { solucao, relacionadas };
  },
  component: function SolucaoPage() {
    const { solucao, relacionadas } = Route.useLoaderData()!;
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
