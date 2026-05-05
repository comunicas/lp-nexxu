import { Link } from "@tanstack/react-router";

const LINKEDIN_FLAVIO = "https://www.linkedin.com/in/flaviohorita/";
const LINKEDIN_RAFAEL = "https://www.linkedin.com/in/rafaelbruno/";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const CREDENTIALS = [
  { value: "AI Summit Brasil 2026", label: "Palestrante confirmado" },
  { value: "Warwick Business School", label: "Visiting Scholar · Reino Unido" },
  { value: "USP — ICMC", label: "PhD Ciência da Computação" },
  { value: "40+ artigos publicados", label: "Sistemas & Engenharia de Software" },
  { value: "Futurecom · TDC Business", label: "Palestrantes" },
  { value: "G4 Educação · StartSe · IAB", label: "Formação executiva" },
  { value: "Coletivo.tech", label: "Colunista de IA" },
  { value: "UFABC", label: "Professor Honorário" },
];

export default function FoundersSection() {
  return (
    <div className="bg-brand-page">
      {/* Seção 1 — Hero */}
      <section className="relative bg-brand-dark py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-blue/10"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-brand-purple-light text-xs font-semibold tracking-widest uppercase mb-4">
            OS FUNDADORES
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white to-brand-purple-light bg-clip-text text-transparent">
            Quem vai te ajudar já resolveu o que você está enfrentando
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            Flávio Horita e Rafael Bruno construíram suas carreiras operando uma das maiores plataformas digitais do Brasil. Eles conhecem escala, processo e o que separa uma empresa estruturada de uma que depende do dono para funcionar.
          </p>
        </div>
      </section>

      {/* Seção 2 — Cards dos Fundadores */}
      <section className="bg-brand-page py-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-brand-muted text-base md:text-lg text-center max-w-3xl mx-auto mb-12">
            Juntos, gerenciam operações que atendem mais de 20 milhões de pessoas por mês e têm como parceiros de mídia Globo, Record, Band e CNN.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card — Flávio */}
            <article className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-8 flex flex-col gap-5 border-l-4 border-brand-purple">
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-deep text-white text-3xl font-display font-bold flex items-center justify-center flex-shrink-0">
                FH
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-text">
                  Flávio Horita
                </h2>
                <p className="text-brand-purple text-sm font-semibold uppercase tracking-wide mt-1">
                  Co-fundador · Tecnologia & Sistemas
                </p>
              </div>
              <p className="text-brand-muted text-base leading-relaxed">
                CTO com PhD pela USP, pesquisador em Warwick (UK) e Münster (Alemanha), professor honorário na UFABC e autor de mais de 40 artigos científicos. Palestrante no AI Summit Brasil 2026. Sua especialidade é transformar sistemas técnicos complexos em operações simples, confiáveis e que escalam sem depender de ninguém.
              </p>
              <ul className="flex flex-wrap gap-2">
                {["PhD USP", "Arquitetura de Sistemas", "IA & Automação", "Warwick", "Münster"].map((tag) => (
                  <li
                    key={tag}
                    className="bg-brand-purple-min text-brand-purple-deep text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <a
                  href={LINKEDIN_FLAVIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm hover:text-brand-purple-deep transition-colors"
                >
                  <LinkedInIcon />
                  Ver no LinkedIn
                </a>
              </div>
            </article>

            {/* Card — Rafael */}
            <article className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-8 flex flex-col gap-5 border-l-4 border-brand-blue">
              <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white text-3xl font-display font-bold flex items-center justify-center flex-shrink-0">
                RB
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-text">
                  Rafael Bruno
                </h2>
                <p className="text-brand-blue text-sm font-semibold uppercase tracking-wide mt-1">
                  Co-fundador · Negócios & Crescimento
                </p>
              </div>
              <p className="text-brand-muted text-base leading-relaxed">
                VP de Mídia com trajetória em marketing, produto e crescimento digital de alto volume. Fundador da Pedallo e Nutrilo. Formado em G4 Educação, StartSe e IAB Brasil. Palestrante no Futurecom e TDC Business. Sua especialidade é construir modelo de negócio que funciona com processo — não com o dono presente em tudo.
              </p>
              <ul className="flex flex-wrap gap-2">
                {["Mídia Programática", "Crescimento Digital", "G4", "StartSe", "Fundador Serial"].map((tag) => (
                  <li
                    key={tag}
                    className="bg-brand-blue/10 text-brand-blue text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <a
                  href={LINKEDIN_RAFAEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:text-brand-purple transition-colors"
                >
                  <LinkedInIcon />
                  Ver no LinkedIn
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Seção 3 — Por que a Nexxu existe */}
      <section className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-brand-text mb-6">
            O problema que eles decidiram resolver
          </h2>
          <p className="text-brand-muted text-lg leading-relaxed">
            Operando em escala, eles viram o mesmo padrão se repetir nas PMEs: dono sobrecarregado, equipe sem processo, crescimento travado na dependência de uma única pessoa. Sabiam como resolver. Faltava só parar de ficar vendo e fazer algo sobre isso.
          </p>
          <blockquote className="bg-brand-purple-min rounded-2xl p-8 mt-8">
            <p className="italic text-brand-purple-deep text-lg leading-relaxed">
              “Não construímos a Nexxu porque queríamos ser consultores. Construímos porque seria desonesto continuar vendo PMEs repetindo os erros que nós já sabíamos como evitar.”
            </p>
            <p className="text-brand-purple text-sm font-semibold mt-4 text-right">
              — Flávio Horita & Rafael Bruno
            </p>
          </blockquote>
        </div>
      </section>

      {/* Seção 4 — Prova Social */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-white text-center mb-10">
            Onde eles já estiveram
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CREDENTIALS.map((item) => (
              <div
                key={item.value}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-1 text-center"
              >
                <span className="text-white text-sm font-semibold">
                  {item.value}
                </span>
                <span className="text-white/40 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 5 — CTA Final */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Chega de operar no improviso
          </h2>
          <p className="text-white/75 text-lg mb-10">
            O Método ORDEM™ é o que Flávio e Rafael desenvolveram para estruturar empresas que crescem sem depender do dono.
          </p>
          <Link
            to="/"
            className="inline-block bg-white text-brand-purple font-semibold px-8 py-4 rounded-xl hover:bg-brand-page transition-colors"
          >
            Ver o Método ORDEM™
          </Link>
          <p className="mt-8 text-white/80 text-sm flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href={LINKEDIN_FLAVIO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              Flávio no LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={LINKEDIN_RAFAEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              Rafael no LinkedIn
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
