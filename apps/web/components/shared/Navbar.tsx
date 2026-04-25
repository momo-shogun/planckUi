import Link from 'next/link';
import Image from 'next/image';

import logo from '../../assets/images/logo-removebg-preview.png';

export type NavbarProps = {
  brandHref?: string;
  centerLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function Navbar(props: NavbarProps): JSX.Element {
  const {
    brandHref = '/',
    centerLabel = 'Glassmorphic',
    ctaHref = '/docs',
    ctaLabel = 'Buy Full Kit',
  } = props;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 text-slate-900 backdrop-blur supports-backdrop-filter:bg-white/65 dark:bg-black/70 dark:text-white">
      <div className="flex h-16 w-full items-center justify-between">
        <Link
          href={brandHref}
          className="group inline-flex items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:focus-visible:ring-white/20"
          aria-label="PlanckUI home"
        >
          {/* <span className="relative grid h-16 w-16 place-items-center overflow-hidden"> */}
            <Image
              src={logo}
              alt="PlanckUI logo"
              className="h-16 w-16 object-contain rounded-full"
              priority
            />
          {/* </span> */}

          <span className="flex flex-col leading-none">
            <span className="text-[22px] font-black tracking-[-0.04em] text-slate-950 sm:text-[26px] dark:text-white">
              Planck
              <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
                UI
              </span>
            </span>
            <span className="hidden items-center gap-2 text-[12px] font-semibold tracking-wide text-slate-600 dark:text-white/55 sm:flex">
              <span className="font-black text-sky-500 dark:text-sky-400">{'>'}_</span>
              <span>React Native UI Library</span>
            </span>
          </span>
        </Link>

        <div className="text-xs font-semibold tracking-wide text-slate-600 dark:text-white/70">
          {centerLabel}
        </div>

        <Link
          href={ctaHref}
          className="inline-flex h-9 items-center justify-center rounded-full border border-slate-900/10 bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/10 dark:text-white/85 dark:hover:bg-white/15 dark:hover:text-white dark:focus-visible:ring-white/20"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

