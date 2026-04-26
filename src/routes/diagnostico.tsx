import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico ORDEM™ — Nexxu" },
      {
        name: "description",
        content:
          "9 perguntas rápidas para descobrir o nível operacional da sua empresa e o próximo passo recomendado.",
      },
    ],
  }),
  component: DiagnosticoPage,
});

function DiagnosticoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--brand-page)]">
      <div className="max-w-md text-center">
        <p className="section-label text-[var(--brand-purple)] mb-3">EM CONSTRUÇÃO</p>
        <h1 className="text-3xl font-extrabold text-[var(--brand-text)]">Diagnóstico ORDEM™</h1>
        <p className="mt-3 text-[var(--brand-muted)]">
          O quiz interativo será implementado na Fase 4.
        </p>
      </div>
    </div>
  );
}
