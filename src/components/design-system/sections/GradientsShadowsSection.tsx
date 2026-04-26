import { DSSection } from "../DSSection";
import { DSTokenCard } from "../DSTokenCard";

export function GradientsShadowsSection() {
  return (
    <DSSection
      id="gradientes"
      title="Gradientes & Sombras"
      description="Texturas e brilhos da marca usados em CTAs, títulos heróicos e cards destacados."
    >
      <h3 className="font-display font-bold text-[15px] text-[var(--brand-text)] mb-3">
        Gradientes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <DSTokenCard
          name="Brand"
          token="--gradient-brand"
          preview={{ background: "var(--gradient-brand)" }}
        >
          .bg-brand-gradient
        </DSTokenCard>
        <DSTokenCard
          name="Text Light"
          token="--gradient-text-light"
          preview={{ background: "var(--gradient-text-light)" }}
        >
          .grad-text-light
        </DSTokenCard>
        <DSTokenCard
          name="Text Pale"
          token="--gradient-text-pale"
          preview={{ background: "var(--gradient-text-pale)" }}
        >
          .grad-text-pale
        </DSTokenCard>
        <DSTokenCard
          name="Hero Headline"
          token="--gradient-hero-headline"
          dark
          preview={{ background: "var(--gradient-hero-headline)" }}
        >
          <span className="text-[var(--brand-dark)]">.grad-text-hero</span>
        </DSTokenCard>
      </div>

      <h3 className="font-display font-bold text-[15px] text-[var(--brand-text)] mb-3">
        Sombras
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[var(--brand-page)] p-8 flex items-center justify-center">
          <div
            className="w-32 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center text-white text-xs font-bold shadow-brand-glow"
          >
            glow
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--brand-page)] p-8 flex items-center justify-center">
          <div className="w-32 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center text-white text-xs font-bold shadow-brand-glow-sm">
            glow-sm
          </div>
        </div>
        <div className="rounded-2xl bg-[var(--brand-page)] p-8 flex items-center justify-center">
          <div
            className="w-32 h-20 rounded-2xl bg-white flex items-center justify-center text-[var(--brand-text)] text-xs font-bold border border-[rgba(83,74,183,0.1)]"
            style={{ boxShadow: "var(--shadow-card-hover)" }}
          >
            card-hover
          </div>
        </div>
      </div>
    </DSSection>
  );
}
