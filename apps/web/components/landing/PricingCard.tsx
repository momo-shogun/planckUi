import type { ReactNode } from 'react';

export type PricingCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: ReactNode;
  featured?: boolean;
  tiltDeg?: number;
  badgeText?: string;
};

export function PricingCard({
  name,
  price,
  tagline,
  features,
  cta,
  featured,
  tiltDeg = 0,
  badgeText,
}: PricingCardProps): JSX.Element {
  return (
    <div
      style={{ transform: tiltDeg ? `rotate(${tiltDeg}deg)` : undefined }}
      className={[
        'relative overflow-hidden rounded-3xl border bg-white/70 p-6 backdrop-blur',
        'shadow-[0_18px_70px_rgba(0,0,0,0.08)] transition-transform duration-300 motion-safe:hover:-rotate-1 motion-safe:hover:scale-[1.015]',
        'dark:bg-white/5 dark:shadow-[0_18px_80px_rgba(0,0,0,0.55)]',
        featured
          ? 'border-transparent ring-1 ring-slate-950/10 dark:ring-white/15'
          : 'border-black/10 dark:border-white/10',
      ].join(' ')}
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/14 blur-3xl dark:bg-fuchsia-500/18" />
          <div className="absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-sky-500/12 blur-3xl dark:bg-sky-500/16" />
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-500/25 via-fuchsia-500/10 to-amber-500/15 opacity-60 dark:opacity-40" />
        </div>
      ) : null}

      <div className="relative">
      {featured ? (
        <div className="absolute right-4 top-4 rounded-full border border-black/10 bg-white/80 px-2.5 py-1 text-[11px] font-black text-slate-900 shadow-sm backdrop-blur dark:border-white/15 dark:bg-black/40 dark:text-white/80">
          {badgeText ?? 'BEST VALUE (still free)'}
        </div>
      ) : null}
      {!featured && badgeText ? (
        <div className="absolute right-4 top-4 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[11px] font-black text-slate-900 shadow-sm backdrop-blur dark:border-white/15 dark:bg-black/40 dark:text-white/80">
          {badgeText}
        </div>
      ) : null}

      <div className="text-sm font-black text-slate-950 dark:text-white">{name}</div>
      <div className="mt-3 flex items-end gap-1">
        <div className="text-[34px] font-black tracking-tight text-slate-950 dark:text-white">
          {price}
        </div>
        {featured ? (
          <div className="ml-2 text-sm font-black text-slate-500 line-through dark:text-white/40">
            ₹9999
          </div>
        ) : null}
      </div>
      <div className="mt-1 text-sm text-slate-600 dark:text-white/60">{tagline}</div>

      <ul className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-white/70">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">{cta}</div>
      </div>
    </div>
  );
}

