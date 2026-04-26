import { createFileRoute } from "@tanstack/react-router";
import { DSLayout } from "@/components/design-system/DSLayout";
import { BrandSection } from "@/components/design-system/sections/BrandSection";
import { ColorsSection } from "@/components/design-system/sections/ColorsSection";
import { TypographySection } from "@/components/design-system/sections/TypographySection";
import { GradientsShadowsSection } from "@/components/design-system/sections/GradientsShadowsSection";
import { LogoSection } from "@/components/design-system/sections/LogoSection";
import { PrimitivesSection } from "@/components/design-system/sections/PrimitivesSection";
import { LandingModulesSection } from "@/components/design-system/sections/LandingModulesSection";
import { DiagnosticoModulesSection } from "@/components/design-system/sections/DiagnosticoModulesSection";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design System — Nexxu" },
      {
        name: "description",
        content:
          "Documentação viva da marca Nexxu: tokens, primitivos e módulos da landing e do diagnóstico.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DesignSystemPage,
});

function DesignSystemPage() {
  return (
    <DSLayout>
      <BrandSection />
      <ColorsSection />
      <TypographySection />
      <GradientsShadowsSection />
      <LogoSection />
      <PrimitivesSection />
      <LandingModulesSection />
      <DiagnosticoModulesSection />
    </DSLayout>
  );
}
