import { Section } from '../shared/Section';
import { StepCard } from './StepCard';

const STEPS = [
  { title: 'Browse components', accent: 'blue' as const },
  { title: 'Copy with a click', accent: 'purple' as const },
  { title: 'One Paste & Limitless Possibilities', accent: 'amber' as const },
];

export function HowItWorks(): JSX.Element {
  return (
    <Section className="pt-24">
      <h2 className="text-center text-[34px] font-black tracking-tight text-slate-950 sm:text-[44px] dark:text-white">
        How It Works
      </h2>

      <div className="mt-10 grid gap-8">
        {STEPS.map((s) => (
          <StepCard key={s.title} title={s.title} accent={s.accent}>
            <div className="grid aspect-[16/8] place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="h-10 w-10 rounded-xl bg-slate-950/80 dark:bg-white/10" />
            </div>
          </StepCard>
        ))}
      </div>
    </Section>
  );
}

