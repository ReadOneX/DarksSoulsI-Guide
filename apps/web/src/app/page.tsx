import { Metadata } from 'next';
import Hero from '@/components/sections/hero';
import Features from '@/components/sections/features';
import FeaturedGuides from '@/components/sections/featured-guides';
import CTA from '@/components/sections/cta';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to your complete Dark Souls I companion guide'
};

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <Features />
      <FeaturedGuides />
      <CTA />
    </main>
  );
}
