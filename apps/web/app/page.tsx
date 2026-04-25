import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { GlowyWavesHero } from '../components/ui/glowy-waves-hero-shadcnui';
import { Hero } from '../components/landing/Hero';
import { Showcase } from '../components/landing/Showcase';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Pricing } from '../components/landing/Pricing';

export default function HomePage(): JSX.Element {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar centerLabel="Glassmorphic" ctaHref="/docs" ctaLabel="Buy Full Kit" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-40 h-[720px] w-[900px] rounded-full bg-blue-500/12 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute -right-40 -top-24 h-[560px] w-[760px] rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/18" />
        <div className="absolute -bottom-64 left-1/2 h-[720px] w-[900px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-500/18" />
      </div>

      <div className="relative pb-20">
        <GlowyWavesHero />
        <Hero />
        <Showcase />
        <HowItWorks />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}

