import Link from 'next/link';
import { Section } from '../shared/Section';

export function Hero(): JSX.Element {
  return (
    <Section className="pt-14">
      <div className="flex flex-col items-center">
      
        <h1 className="mt-5 text-balance text-center text-[44px] font-black leading-[1.04] tracking-tighter text-slate-950 sm:text-[56px] dark:text-white">
          Components You&apos;ll Want
        </h1>

        <p className="mt-4 max-w-[740px] text-pretty text-center text-[15px] leading-[1.7] text-slate-600 sm:text-[16px] dark:text-white/65">
          Copy, paste, and ship faster for modern apps. Components, icons, patterns, and animations
          in one place.
        </p>

      </div>
    </Section>
  );
}

