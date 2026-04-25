import Link from 'next/link';
import { Section } from '../shared/Section';
import { PricingCard } from './PricingCard';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'Get the feel of the kit.',
    features: ['Docs access', 'Limited previews', 'Community updates'],
    featured: false,
    cta: (
      <Link
        href="/docs"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-black/10 bg-white/70 text-sm font-black text-slate-950 shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/20"
      >
        Browse Docs
      </Link>
    ),
  },
  {
    name: 'Starter',
    price: '$50/component',
    tagline: 'Best for teams shipping fast.',
    features: ['Copy‑paste components', 'Design tokens', 'Examples + patterns', 'Priority updates'],
    featured: true,
    cta: (
      <Link
        href="/docs"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-white dark:text-slate-950 dark:hover:bg-white/90 dark:focus-visible:ring-white/20"
      >
        Get Starter
      </Link>
    ),
  },
  {
    name: 'Custom',
    price: 'Quote',
    tagline: 'For large orgs & custom builds.',
    features: ['Private support', 'Custom components', 'Migration help', 'Roadmap input'],
    featured: false,
    cta: (
      <Link
        href="/docs"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-black/10 bg-white/70 text-sm font-black text-slate-950 shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/20"
      >
        Contact
      </Link>
    ),
  },
];

export function Pricing(): JSX.Element {
  return (
    <Section className="pt-24">
      <h2 className="text-center text-[34px] font-black tracking-tight text-slate-950 sm:text-[44px] dark:text-white">
        Choose Your Plan
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PLANS.map((p) => (
          <PricingCard
            key={p.name}
            name={p.name}
            price={p.price}
            tagline={p.tagline}
            features={p.features}
            featured={p.featured}
            cta={p.cta}
          />
        ))}
      </div>
    </Section>
  );
}

