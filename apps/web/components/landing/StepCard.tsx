import type { ReactNode } from 'react';

export type StepCardProps = {
  title: string;
  children: ReactNode;
  accent: 'blue' | 'purple' | 'amber';
};

const ACCENT: Record<StepCardProps['accent'], { from: string; to: string; glow: string }> = {
  blue: { from: 'from-sky-500/25', to: 'to-emerald-500/20', glow: 'bg-sky-500/18' },
  purple: { from: 'from-fuchsia-500/25', to: 'to-indigo-500/20', glow: 'bg-fuchsia-500/16' },
  amber: { from: 'from-amber-500/22', to: 'to-rose-500/18', glow: 'bg-amber-500/14' },
};

export function StepCard({ title, children, accent }: StepCardProps): JSX.Element {
  const a = ACCENT[accent];

  return (
    <div className="relative">
      <div className={['absolute -inset-6 rounded-[32px] blur-3xl', a.glow].join(' ')} />
      <div
        className={[
          'relative overflow-hidden rounded-[28px] p-[1px]',
          'bg-gradient-to-br',
          a.from,
          a.to,
        ].join(' ')}
      >
        <div className="rounded-[27px] border border-black/10 bg-white/75 px-5 py-6 shadow-[0_18px_70px_rgba(0,0,0,0.10)] backdrop-blur dark:border-white/10 dark:bg-black/35 dark:shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
          <div className="text-center text-[22px] font-black tracking-tight text-slate-950 dark:text-white">
            {title}
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

