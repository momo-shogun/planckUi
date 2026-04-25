import { Section } from '../shared/Section';

const CHIP_BASE =
  'inline-flex h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:focus-visible:ring-white/20';

export function Showcase(): JSX.Element {
  return (
    <Section className="pt-10">
      <div className="relative mt-10 overflow-hidden rounded-[26px] border border-black/10 bg-white/70 shadow-[0_24px_100px_rgba(0,0,0,0.10)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_120px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl dark:bg-fuchsia-500/20" />
          <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl dark:bg-sky-500/20" />
          <div className="absolute -bottom-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/12 blur-3xl dark:bg-emerald-500/18" />
        </div>

        <div className="relative flex flex-col items-center px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid aspect-[16/11] w-full max-w-[560px] place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/15 dark:bg-black/40">
            <div className="h-44 w-44 rounded-2xl bg-slate-950/90 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] dark:bg-white/10" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              className={[
                CHIP_BASE,
                'bg-slate-950 text-white hover:bg-slate-900 dark:bg-white/10 dark:text-white/85 dark:hover:bg-white/15',
              ].join(' ')}
            >
              Add
            </button>
            <button
              type="button"
              className={[
                CHIP_BASE,
                'border border-black/10 bg-white/60 text-slate-900 shadow-sm backdrop-blur hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10',
              ].join(' ')}
            >
              Preview
            </button>
            <button
              type="button"
              className={[
                CHIP_BASE,
                'border border-black/10 bg-white/60 text-slate-900 shadow-sm backdrop-blur hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10',
              ].join(' ')}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

