import Link from 'next/link';
import { Section } from '../shared/Section';

export function Hero(): JSX.Element {
  return (
    <Section className="pt-14">
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/70 px-3 py-2 shadow-sm backdrop-blur dark:border-white/15 dark:bg-white/5">
        {/* <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.18)]" /> */}
        {/* <span className="text-[13px] font-semibold text-slate-700 dark:text-white/80">
          shadcn‑inspired RN CLI UI kit
        </span> */}
        </div>

        <h1 className="mt-5 text-balance text-center text-[44px] font-black leading-[1.04] tracking-tighter text-slate-950 sm:text-[56px] dark:text-white">
          Components You&apos;ll Want
        </h1>

        <p className="mt-4 max-w-[740px] text-pretty text-center text-[15px] leading-[1.7] text-slate-600 sm:text-[16px] dark:text-white/65">
          Copy, paste, and ship faster for modern apps. Components, icons, patterns, and animations
          in one place.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/quickstart"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:bg-white dark:text-slate-950 dark:hover:bg-white/90 dark:focus-visible:ring-white/20"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white/60 px-5 text-sm font-black text-slate-900 shadow-sm backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-white/20"
          >
            Browse components
          </Link>
        </div>
      </div>
    </Section>
  );
}

