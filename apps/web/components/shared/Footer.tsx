import Link from 'next/link';

const FOOTER_LINKS: Array<{ label: string; href: string }> = [
  { label: 'Docs', href: '/docs' },
  { label: 'Quickstart', href: '/docs/quickstart' },
  { label: 'Components', href: '/docs/components' },
];

export function Footer(): JSX.Element {
  return (
    <footer className="mt-20 border-t border-black/5 py-10 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 px-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-sm font-black tracking-tight text-slate-950 dark:text-white">
            planckUi
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-white/60">
            Copy‑paste React Native UI for CLI.
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:text-white/70 dark:hover:text-white dark:focus-visible:ring-white/20"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

