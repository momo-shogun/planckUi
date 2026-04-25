'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

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

  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 36);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shellClassName = useMemo(() => {
    const base =
      'z-50 backdrop-blur supports-backdrop-filter:bg-white/65 dark:supports-backdrop-filter:bg-black/55 transition-[transform,opacity,background-color,box-shadow,border-color,width,max-width] duration-200';

    if (!isCompact) {
      return [
        'sticky top-0 w-full',
        'bg-white/75 text-slate-900 dark:bg-black/70 dark:text-white',
        base,
      ].join(' ');
    }

    return [
      'fixed top-3 left-1/2 w-[calc(100%-24px)] max-w-[980px] -translate-x-1/2',
      'rounded-2xl border border-black/10 bg-white/75 text-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.16)]',
      'dark:border-white/12 dark:bg-black/70 dark:text-white dark:shadow-[0_14px_60px_rgba(0,0,0,0.55)]',
      base,
    ].join(' ');
  }, [isCompact]);

  return (
    <header className={shellClassName}>
      <div className={['flex w-full items-center justify-between', isCompact ? 'h-12 px-2.5' : 'h-16'].join(' ')}>
        <Link
          href={brandHref}
          className={[
            'group inline-flex items-center gap-3 rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:focus-visible:ring-white/20',
            isCompact ? 'px-2 py-1.5' : 'px-2.5 py-2',
          ].join(' ')}
          aria-label="PlanckUI home"
        >
          {/* <span className="relative grid h-16 w-16 place-items-center overflow-hidden"> */}
            <Image
              src={logo}
              alt="PlanckUI logo"
              className={['object-contain rounded-full', isCompact ? 'h-9 w-9' : 'h-16 w-16'].join(' ')}
              priority
            />
          {/* </span> */}

          <span className="flex flex-col leading-none">
            <span
              className={[
                'font-black tracking-[-0.04em] text-slate-950 dark:text-white',
                isCompact ? 'text-[18px]' : 'text-[22px] sm:text-[26px]',
              ].join(' ')}
            >
              Planck
              <span className="bg-linear-to-r from-sky-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
                UI
              </span>
            </span>
            <span
              className={[
                'items-center gap-2 text-[12px] font-semibold tracking-wide text-slate-600 dark:text-white/55',
                isCompact ? 'hidden' : 'hidden sm:flex',
              ].join(' ')}
            >
              <span className="font-black text-sky-500 dark:text-sky-400">{'>'}_</span>
              <span>React Native UI Library</span>
            </span>
          </span>
        </Link>

        <div className={['text-xs font-semibold tracking-wide text-slate-600 dark:text-white/70', isCompact ? 'hidden' : ''].join(' ')}>
          {centerLabel}
        </div>

        <Link
          href={ctaHref}
          className={[
            'inline-flex h-9 items-center justify-center rounded-full border border-slate-900/10 bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 dark:border-white/15 dark:bg-white/10 dark:text-white/85 dark:hover:bg-white/15 dark:hover:text-white dark:focus-visible:ring-white/20',
            isCompact ? 'hidden' : '',
          ].join(' ')}
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}

