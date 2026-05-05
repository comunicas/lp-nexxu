import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Slide = {
  src: string;
  alt: string;
};

const SLIDES: Slide[] = [
  { src: "/lovable-uploads/trajetoria/futurecom.jpg", alt: "Rafael Bruno no palco do Futurecom 30 anos em São Paulo" },
  { src: "/lovable-uploads/trajetoria/app-summit-google.jpg", alt: "Flávio Horita palestrando no App Summit do Google" },
  { src: "/lovable-uploads/trajetoria/google-cloud-summit.jpg", alt: "Flávio Horita e equipe no Google Cloud Summit São Paulo" },
  { src: "/lovable-uploads/trajetoria/tdc-business.jpg", alt: "Rafael Bruno palestrando na trilha de Data Science do TDC Business" },
  { src: "/lovable-uploads/trajetoria/sprintpro.jpg", alt: "Rafael Bruno conduzindo workshop SprintPro" },
  { src: "/lovable-uploads/trajetoria/forum-apps.jpg", alt: "Rafael Bruno em painel do Fórum dos Apps" },
  { src: "/lovable-uploads/trajetoria/workshop-logistica.jpg", alt: "Rafael Bruno facilitando workshop de inovação com post-its" },
  { src: "/lovable-uploads/trajetoria/climatempo-workshop.jpg", alt: "Treinamento interno no Grupo Climatempo" },
  { src: "/lovable-uploads/trajetoria/qa-startup.jpg", alt: "Sessão de Q&A com a comunidade de startups" },
];

export default function FoundersJourney() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-purple text-xs font-semibold tracking-widest uppercase mb-3">
            TRAJETÓRIA
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-text mb-4">
            De palcos, bastidores e operações reais
          </h2>
          <p className="text-brand-muted text-base md:text-lg leading-relaxed">
            Mais de uma década compartilhando o que aprenderam em eventos como AI Summit, Futurecom, TDC, Google Cloud Summit e dentro de operações com milhões de usuários.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="px-2 md:px-12"
        >
          <CarouselContent>
            {SLIDES.map((slide) => (
              <CarouselItem
                key={slide.src}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col border border-brand-purple/10">
                  <div className="aspect-video overflow-hidden bg-brand-page">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <span className="inline-block self-start bg-brand-purple-min text-brand-purple-deep text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {slide.tag}
                    </span>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {slide.caption}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex left-0 bg-white" />
          <CarouselNext className="hidden md:flex right-0 bg-white" />
        </Carousel>

        <div className="flex justify-center gap-2 mt-8" aria-hidden="true">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                current === i ? "w-8 bg-brand-purple" : "w-2 bg-brand-purple/25"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
