import type { ReactNode } from 'react';

export type PricingCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: ReactNode;
  featured?: boolean;
};

export function PricingCard({
  name,
  price,
  tagline,
  features,
  cta,
  featured,
}: PricingCardProps): JSX.Element {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-3xl border bg-white/70 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur',
        'dark:bg-white/5 dark:shadow-[0_18px_80px_rgba(0,0,0,0.55)]',
        featured
          ? 'border-slate-950/10 ring-1 ring-slate-950/10 dark:border-white/15 dark:ring-white/15'
          : 'border-black/10 dark:border-white/10',
      ].join(' ')}
    >
      {featured ? (
        <div className="absolute right-4 top-4 rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[11px] font-black text-slate-900 shadow-sm backdrop-blur dark:border-white/15 dark:bg-black/40 dark:text-white/80">
          Recommended
        </div>
      ) : null}

      <div className="text-sm font-black text-slate-950 dark:text-white">{name}</div>
      <div className="mt-3 flex items-end gap-1">
        <div className="text-[34px] font-black tracking-tight text-slate-950 dark:text-white">
          {price}
        </div>
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
  );
}

