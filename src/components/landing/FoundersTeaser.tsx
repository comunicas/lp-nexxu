import { Link } from "@tanstack/react-router";

const TAGS = ["PhD USP", "Warwick", "MBA Madia", "XBA StartSe", "AI Summit 2026"];

export function FoundersTeaser() {
  return (
    <section className="bg-brand-page py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-card border border-brand-purple/10">
          <img
            src="/lovable-uploads/fundadores-nexxu.jpg"
            alt="Flávio Horita e Rafael Bruno — Fundadores da Nexxu"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <p className="text-brand-purple text-xs font-semibold tracking-widest uppercase mb-4">
            OS FUNDADORES
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-text leading-tight">
            Quem está por trás do Método ORDEM™
          </h2>
          <p className="mt-5 text-brand-muted text-base md:text-lg leading-relaxed">
            <strong className="text-brand-text">Flávio Horita</strong> (PhD USP, CTO) e{" "}
            <strong className="text-brand-text">Rafael Bruno</strong> (VP de Mídia, MBA) já participaram de projetos digitais que impactam mais de 20 milhões de pessoas por mês — Globo, iFood, Ford, Petrobras. Agora aplicam essa experiência para estruturar PMEs que crescem sem depender do dono.
          </p>

          <ul className="flex flex-wrap gap-2 mt-6">
            {TAGS.map((tag) => (
              <li
                key={tag}
                className="bg-brand-purple-min text-brand-purple-deep text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              to="/fundadores"
              className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-6 py-3.5 rounded-xl shadow-brand-glow-sm hover:-translate-y-0.5 transition-transform"
            >
              Conhecer os fundadores
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
