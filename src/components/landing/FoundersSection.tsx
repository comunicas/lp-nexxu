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

type Founder = {
  name: string;
  role: string;
  roleColor: string;
  accentClass: string;
  photoSrc: string;
  photoBorder: string;
  paragraphs: string[];
  tags: string[];
  linkedin: string;
};

const FOUNDERS: Founder[] = [
  {
    initials: "FH",
    name: "Flávio Horita",
    role: "Co-fundador · CTO & Arquitetura de Sistemas",
    roleColor: "text-brand-purple",
    accentClass: "border-l-4 border-brand-purple",
    avatarGradient: "bg-gradient-to-br from-brand-purple to-brand-purple-deep",
    paragraphs: [
      "Flávio é CTO da Climatempo, empresa do grupo StormGeo — uma das referências globais em dados meteorológicos aplicados a negócios. Sob sua liderança técnica, a plataforma processa dados climáticos em tempo real para mais de 20 milhões de pessoas por mês, servindo clientes como Globo, Record, Band e CNN.",
      "Doutor em Ciência da Computação pela USP (ICMC), ele também atuou como Visiting Scholar na Warwick Business School (Reino Unido) e na Universidade de Münster (Alemanha), e foi professor honorário na UFABC. Publicou mais de 40 artigos científicos sobre sistemas de informação, engenharia de software e gestão de negócios.",
      "É palestrante confirmado no AI Summit Brasil 2026 e colaborador do Coletivo.tech, onde escreve sobre IA, governança de dados e futuro climático. Na Nexxu, ele traz toda essa profundidade para transformar operações complexas em sistemas simples, escaláveis e independentes do dono.",
    ],
    tags: [
      "Arquitetura de Sistemas",
      "Inteligência Artificial",
      "Transformação Digital",
      "PhD USP",
      "StormGeo",
    ],
    linkedin: LINKEDIN_FLAVIO,
  },
  {
    initials: "RB",
    name: "Rafael Bruno",
    role: "Co-fundador · Estratégia, Mídia & Crescimento Digital",
    roleColor: "text-brand-blue",
    accentClass: "border-l-4 border-brand-blue",
    avatarGradient: "bg-gradient-to-br from-brand-blue to-brand-purple",
    paragraphs: [
      "Rafael é VP de Mídia da Climatempo, onde lidera a unificação dos pilares de negócio digital, PayTV e produção de conteúdo meteorológico para as maiores redes de comunicação do Brasil — Globo, Record, Band e CNN. Sob sua gestão, os portais Climatempo alcançam mais de 20 milhões de pessoas mensalmente com modelo de negócio baseado em dados, mídia programática e projetos especiais.",
      "Além da Climatempo, Rafael é fundador de dois negócios: a Pedallo, startup de tecnologia para ciclismo urbano, e a Nutrilo, EdTech focada em educação nutricional. Sua formação inclui certificações em Liderança em Alta Performance pela G4 Educação, Growth Program de Sales & Marketing Acceleration pela StartSe University e especialização em publicidade digital pelo IAB Brasil.",
      "Palestrante em eventos como Futurecom, TDC Business (trilha Data Science) e Furo dos Apps, Rafael acumula uma visão rara: sabe tanto construir audiência em escala quanto converter essa audiência em receita recorrente. Na Nexxu, ele transforma essa experiência em estratégia operacional para PMEs que precisam crescer sem depender de improviso.",
    ],
    tags: [
      "Mídia Programática",
      "Crescimento Digital",
      "G4 Educação",
      "StartSe",
      "IAB Brasil",
    ],
    linkedin: LINKEDIN_RAFAEL,
  },
];

const CREDENTIALS = [
  { label: "Empresa", title: "Climatempo / StormGeo", sub: "20M+ usuários/mês" },
  { label: "Evento", title: "AI Summit Brasil 2026", sub: "Palestrante confirmado" },
  { label: "Universidade · Reino Unido", title: "Warwick Business School", sub: "Visiting Scholar" },
  { label: "Doutorado", title: "USP — ICMC", sub: "PhD Ciência da Computação" },
  { label: "Clientes", title: "Globo · Record · Band · CNN", sub: "Parceiros de mídia" },
  { label: "Formação", title: "G4 Educação · StartSe", sub: "Certificações executivas" },
  { label: "Eventos", title: "Futurecom · TDC Business", sub: "Palestrante" },
  { label: "Publicações", title: "Coletivo.tech", sub: "Colunista de IA" },
];

export default function FoundersSection() {
  return (
    <div className="bg-brand-page">
      {/* Seção 1 — PageHero */}
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
            Construído por quem já viveu o problema por dentro
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed">
            Antes da Nexxu, Flávio e Rafael passaram anos dentro de uma das maiores plataformas digitais do Brasil — servindo mais de 20 milhões de pessoas por mês, gerenciando tecnologia de ponta e crescimento de negócio em alta escala. Eles não criaram uma consultoria de teoria. Criaram uma metodologia baseada no que funciona de verdade.
          </p>
        </div>
      </section>

      {/* Seção 2 — Cards dos Fundadores */}
      <section className="bg-brand-page">
        <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FOUNDERS.map((f) => (
            <article
              key={f.name}
              className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-8 flex flex-col gap-6 ${f.accentClass}`}
            >
              <div
                className={`flex items-center justify-center rounded-full text-white text-3xl font-display font-bold flex-shrink-0 ${f.avatarGradient}`}
                style={{ width: 120, height: 120 }}
                aria-hidden="true"
              >
                {f.initials}
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-brand-text">
                  {f.name}
                </h2>
                <p className={`${f.roleColor} text-sm font-semibold uppercase tracking-wide mt-1`}>
                  {f.role}
                </p>
              </div>
              <div className="space-y-4">
                {f.paragraphs.map((p, i) => (
                  <p key={i} className="text-brand-muted text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              <ul className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
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
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm hover:text-brand-purple-deep transition-colors"
                >
                  <LinkedInIcon />
                  Ver perfil no LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Seção 3 — Credenciais e Eventos */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-white text-center mb-12">
            Onde eles já estiveram
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CREDENTIALS.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-center"
              >
                <span className="text-white/40 text-xs uppercase tracking-wide">
                  {item.label}
                </span>
                <span className="text-white/80 text-sm font-medium">
                  {item.title}
                </span>
                <span className="text-white/60 text-xs">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 4 — Por que a Nexxu existe */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-brand-text mb-8">
            O problema que eles decidiram resolver
          </h2>
          <div className="text-brand-muted text-lg leading-relaxed space-y-5">
            <p>
              Anos dentro da Climatempo — uma empresa que serve mais de 20 milhões de pessoas por mês e tem como clientes as maiores redes de TV do Brasil — ensinaram algo que nenhuma consultoria tradicional ensina: a diferença entre uma empresa que escala e uma que trava está sempre na operação, não na ideia.
            </p>
            <p>
              Flávio viu isso do lado da tecnologia. Rafael viu do lado do negócio e da mídia. Os dois viram o mesmo padrão se repetir nas PMEs com quem trabalhavam: dono sobrecarregado, equipe sem processo, crescimento travado pela dependência de uma única pessoa.
            </p>
            <p>
              A Nexxu nasceu dessa observação compartilhada. Não é uma consultoria de apresentação bonita — é uma metodologia de inovação operacional desenhada pra PME brasileira, com ferramentas reais, acompanhamento próximo e IA aplicada onde faz diferença de verdade.
            </p>
          </div>
          <blockquote className="bg-brand-purple-min rounded-2xl p-8 mt-10">
            <p className="italic text-brand-purple-deep text-lg leading-relaxed">
              “Não construímos a Nexxu porque queríamos ser consultores. Construímos porque chegamos num ponto em que seria desonesto continuar vendo PMEs repetindo os mesmos erros que nós já sabíamos como evitar.”
            </p>
            <p className="text-brand-purple text-sm font-semibold mt-4 text-right">
              — Flávio Horita & Rafael Bruno
            </p>
          </blockquote>
        </div>
      </section>

      {/* Seção 5 — CTA Final */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Conheça o método que eles desenvolveram
          </h2>
          <p className="text-white/80 text-lg mb-10">
            O ORDEM™ é a síntese de tudo que Flávio e Rafael aprenderam operando em escala. Agora disponível para PMEs brasileiras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-brand-purple font-semibold px-8 py-4 rounded-xl hover:bg-brand-page transition-colors"
            >
              Ver o Método ORDEM™
            </Link>
            <a
              href={LINKEDIN_FLAVIO}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <LinkedInIcon />
              LinkedIn do Flávio
            </a>
            <a
              href={LINKEDIN_RAFAEL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white font-semibold px-6 py-4 rounded-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              <LinkedInIcon />
              LinkedIn do Rafael
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
