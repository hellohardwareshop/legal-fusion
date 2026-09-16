import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1600px] space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10", className)}>
      {children}
    </div>
  );
}

interface ModuleHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  actions?: ReactNode;
  meta?: Array<{ label: string; value: string }>;
}

export function ModuleHero({ eyebrow, title, description, icon: Icon, actions, meta }: ModuleHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="hero-surface relative overflow-hidden p-5 sm:p-7 lg:p-9"
    >
      <div aria-hidden className="hero-grid-pattern pointer-events-none absolute inset-0" />
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5">
        <div className="flex min-w-0 items-start gap-4">
          {Icon && (
            <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm sm:grid">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-foreground/70">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-1 truncate text-2xl font-bold text-primary-foreground lg:text-3xl">{title}</h1>
            {description && (
              <p className="mt-1 max-w-2xl text-sm text-primary-foreground/75">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {meta && meta.length > 0 && (
        <div className="relative mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {meta.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-primary-foreground/15 bg-background/15 px-3 py-2 backdrop-blur-sm"
            >
              <p className="text-[11px] uppercase tracking-wide text-primary-foreground/70">{item.label}</p>
              <p className="mt-0.5 truncate text-base font-semibold text-primary-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default PageShell;
