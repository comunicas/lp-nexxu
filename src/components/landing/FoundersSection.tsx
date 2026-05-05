import { Link } from "@tanstack/react-router";

type Founder = {
  initials: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  accentClass: string;
};

const FOUNDERS: Founder[] = [
  {
    initials: "FH",
    name: "Flávio Horita",
    role: "Co-fundador · Tecnologia & Arquitetura de Sistemas",
    bio: "Flávio passou anos construindo a espinha dorsal tecnológica de uma das maiores plataformas digitais do Brasil. Arquitetura de sistemas, automação inteligente e IA não são buzzwords pra ele — são ferramentas que ele usa todo dia pra resolver problemas reais. Na Nexxu, ele traduz complexidade técnica em operação simples.",
    tags: ["Tecnologia", "Arquitetura de Sistemas", "Inteligência Artificial", "Automação", "Infra"],
    accentClass: "border-l-4 border-brand-purple",
  },
  {
    initials: "RB",
    name: "Rafael Bruno",
    role: "Co-fundador · Estratégia de Negócios & Crescimento",
    bio: "Rafael construiu sua carreira na interseção entre marketing, produto e mídia digital — sempre dentro de operações de alto volume. Ele sabe o que separa uma empresa que cresce de uma que se perde no improviso: processo. Na Nexxu, ele transforma visão de negócio em rotina que funciona sem depender do dono.",
    tags: ["Marketing", "Produto", "Mídia Digital", "Crescimento", "Estratégia"],
    accentClass: "border-l-4 border-brand-blue",
  },
];

export default function FoundersSection() {
  return (
    <div className="bg-brand-page">
      {/* Seção 1 — PageHero */}
      <section className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(83,74,183,0.10), rgba(24,95,165,0.10))",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-brand-purple-light text-xs font-semibold tracking-widest uppercase mb-4">
            OS FUNDADORES
          </p>
          <h1 className="font-display font-extrabold text-[clamp(36px,5vw,60px)] leading-tight tracking-tight bg-gradient-to-r from-white to-brand-purple-light bg-clip-text text-transparent">
            Construído por quem já esteve do outro lado
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            Flávio e Rafael não criaram a Nexxu numa garagem. Eles saíram de
            dentro de uma das maiores plataformas digitais do Brasil — depois
            de anos vendo PMEs tentando crescer sem estrutura — e decidiram
            que era hora de fazer algo sobre isso.
          </p>
        </div>
      </section>

      {/* Seção 2 — Perfis dos Fundadores */}
      <section className="bg-brand-page">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {FOUNDERS.map((f) => (
            <article
              key={f.name}
              className={`bg-white shadow-card hover:shadow-card-hover transition-shadow rounded-2xl p-8 ${f.accentClass}`}
            >
              <div
                className="flex items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-blue text-white font-display font-bold text-3xl mb-6"
                style={{ width: 120, height: 120 }}
                aria-hidden="true"
              >
                {f.initials}
              </div>
              <h2 className="text-2xl font-display font-bold text-brand-text">
                {f.name}
              </h2>
              <p className="text-brand-purple text-sm font-semibold uppercase tracking-wide mt-1">
                {f.role}
              </p>
              <p className="text-brand-muted text-base leading-relaxed mt-4">
                {f.bio}
              </p>
              <ul className="flex flex-wrap gap-2 mt-6">
                {f.tags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-brand-purple-min text-brand-purple-deep text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Seção 3 — Por que a Nexxu existe */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="font-display font-extrabold text-3xl text-brand-text tracking-tight">
            O problema que eles decidiram resolver
          </h2>
          <p className="mt-6 text-brand-muted text-base leading-relaxed">
            Depois de anos dentro de uma plataforma digital servindo milhares
            de pequenas e médias empresas, Flávio e Rafael viram o mesmo padrão
            se repetir: dono sobrecarregado, equipe sem processo, crescimento
            travado na dependência de uma única pessoa.
          </p>
          <p className="mt-4 text-brand-muted text-base leading-relaxed">
            A Nexxu nasceu dessa observação. Não é uma consultoria de planilha
            e slide — é uma metodologia de inovação operacional desenhada pra
            PME brasileira, com ferramentas, acompanhamento e IA aplicada onde
            faz diferença.
          </p>
          <blockquote className="mt-10 bg-brand-purple-min rounded-2xl p-8">
            <p className="italic text-brand-purple-deep text-lg leading-relaxed">
              A Nexxu não foi criada pra ser mais uma consultoria. Foi criada
              porque Flávio e Rafael cansaram de ver PMEs repetindo os mesmos
              erros que eles já sabiam como resolver.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Seção 4 — CTA Final */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            Conheça o método que eles desenvolveram
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            O ORDEM™ é a síntese de tudo que Flávio e Rafael aprenderam sobre
            como PMEs podem crescer com estrutura.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-white text-brand-purple font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Ver o Método ORDEM™
            </Link>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Falar com os fundadores
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
