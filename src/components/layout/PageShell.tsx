import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-5 py-6 md:px-8 md:py-8 space-y-6", className)}>
      {children}
    </div>
  );
}

interface ModuleHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: ReactNode;
  meta?: Array<{ label: string; value: string }>;
}

export function ModuleHero({ eyebrow, title, description, icon: Icon, actions, meta }: ModuleHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="hero-surface relative overflow-hidden px-6 py-6 md:px-8 md:py-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 90% at 85% 0%, rgba(255,255,255,0.22), transparent 60%), radial-gradient(50% 70% at 10% 110%, rgba(0,0,0,0.28), transparent 60%)",
        }}
      />
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          {Icon && (
            <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-sm sm:grid">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-1 truncate text-xl font-semibold text-primary-foreground md:text-2xl">{title}</h1>
            {description && (
              <p className="mt-1.5 max-w-2xl text-sm text-primary-foreground/80">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {meta && meta.length > 0 && (
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {meta.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm"
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
