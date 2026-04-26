import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "sm" | "secondary" | "cta";

const baseClass =
  "inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  primary:
    "px-8 py-4 rounded-2xl text-white text-base bg-brand-gradient shadow-brand-glow hover:-translate-y-0.5",
  ghost:
    "px-8 py-4 rounded-2xl text-base font-semibold text-white/85 border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/40 hover:bg-white/10",
  sm:
    "px-5 py-3 rounded-xl text-sm text-white bg-brand-gradient shadow-brand-glow-sm w-fit hover:opacity-90",
  secondary:
    "px-4 py-3 rounded-xl text-sm font-semibold text-[var(--brand-muted)] bg-transparent border border-[rgba(83,74,183,0.2)] hover:border-[var(--brand-purple)] hover:text-[var(--brand-purple)] hover:bg-[rgba(83,74,183,0.05)]",
  cta:
    "px-4 py-3 rounded-xl text-sm text-white bg-brand-gradient shadow-brand-glow-sm hover:opacity-90 hover:-translate-y-0.5",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

type Props = ButtonProps | AnchorProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(props, ref) {
    const { variant = "primary", className, children, ...rest } = props as ButtonProps & AnchorProps;
    const cls = cn(baseClass, variantClasses[variant], className);

    if ((props as AnchorProps).as === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cls}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
