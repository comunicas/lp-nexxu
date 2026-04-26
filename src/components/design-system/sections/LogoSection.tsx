import { Logo } from "@/components/ui-nexxu/Logo";
import { DSSection } from "../DSSection";

export function LogoSection() {
  return (
    <DSSection
      id="logo"
      title="Logo"
      description="Duas variantes: full (com wordmark) e mark (apenas o símbolo)."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] overflow-hidden bg-white">
          <div className="bg-white h-40 flex items-center justify-center">
            <Logo variant="full" />
          </div>
          <div className="px-5 py-3 border-t border-[rgba(83,74,183,0.08)]">
            <p className="font-display font-bold text-[14px]">Full · sobre claro</p>
            <p className="text-[12px] text-[var(--brand-muted)] mt-0.5">
              Uso primário em navs, cabeçalhos e materiais brand.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] overflow-hidden bg-white">
          <div className="bg-[var(--brand-dark)] h-40 flex items-center justify-center">
            <Logo variant="full" />
          </div>
          <div className="px-5 py-3 border-t border-[rgba(83,74,183,0.08)]">
            <p className="font-display font-bold text-[14px]">Full · sobre dark</p>
            <p className="text-[12px] text-[var(--brand-muted)] mt-0.5">
              Variante padrão também funciona sobre fundos escuros.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] overflow-hidden bg-white">
          <div className="bg-white h-40 flex items-center justify-center">
            <Logo variant="mark" />
          </div>
          <div className="px-5 py-3 border-t border-[rgba(83,74,183,0.08)]">
            <p className="font-display font-bold text-[14px]">Mark · sobre claro</p>
            <p className="text-[12px] text-[var(--brand-muted)] mt-0.5">
              Para favicons, avatares e usos compactos.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-[rgba(83,74,183,0.12)] overflow-hidden bg-white">
          <div className="bg-[var(--brand-dark)] h-40 flex items-center justify-center">
            <Logo variant="mark" />
          </div>
          <div className="px-5 py-3 border-t border-[rgba(83,74,183,0.08)]">
            <p className="font-display font-bold text-[14px]">Mark · sobre dark</p>
            <p className="text-[12px] text-[var(--brand-muted)] mt-0.5">
              Mantém contraste graças aos gradientes claros.
            </p>
          </div>
        </div>
      </div>
    </DSSection>
  );
}
