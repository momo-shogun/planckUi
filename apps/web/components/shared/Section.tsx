import type { ReactNode } from 'react';

export type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps): JSX.Element {
  return (
    <section className={['mx-auto w-full max-w-[1180px] px-4', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  );
}

