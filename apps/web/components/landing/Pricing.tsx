import Link from 'next/link';
import { Section } from '../shared/Section';
import { PricingCard } from './PricingCard';

const PLANS = [
  {
    name: 'Brokie Plan',
    price: '₹0',
    tagline: 'Same as the rich plan.',
    features: [
      'Everything included 🤝',
      'Still everything included 🤝',
      'Yep… still everything 🤝',
      'Why are you still reading this? 😭',
    ],
    featured: true,
    tiltDeg: -1,
    badgeText: 'BROKIE APPROVED',
    cta: (
      <Link
        href="/docs"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-white dark:text-slate-950 dark:hover:bg-white/90 dark:focus-visible:ring-white/20"
      >
        Get it free
      </Link>
    ),
  },
  {
    name: 'Free',
    price: '₹0.00',
    tagline: 'Because great tools shouldn’t ask for your wallet first.',
    features: ['Full access', 'No limits', 'No nonsense'],
    featured: false,
    tiltDeg: 1,
    badgeText: 'NO PAYWALLS',
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
    name: 'Free Forever',
    price: '₹0,000',
    tagline: 'We tried to add pricing… felt cringe.',
    features: [
      'Everything unlocked 🔓',
      'No paywalls 🙅',
      'No trial ending anxiety ⏳❌',
      'Sleep peacefully at night 😴',
    ],
    featured: false,
    tiltDeg: -0.5,
    badgeText: 'FOREVER MODE',
    cta: (
      <Link
        href="/docs"
        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-black/10 bg-white/70 text-sm font-black text-slate-950 shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/20"
      >
        Start now
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
            tiltDeg={p.tiltDeg}
            badgeText={p.badgeText}
          />
        ))}
      </div>
    </Section>
  );
}

