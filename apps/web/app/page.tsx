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

