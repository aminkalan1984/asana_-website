import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { WhyAsana } from '../components/home/WhyAsana';
import { QuickTrackWidget } from '../components/home/QuickTrackWidget';
import { NewsSection } from '../components/home/NewsSection';
import { StatsSection } from '../components/home/StatsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { CTABanner } from '../components/home/CTABanner';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      <HeroSection onNavigate={onNavigate} />
      <TrustBar />
      <ServicesOverview onNavigate={onNavigate} />
      <WhyAsana />
      <QuickTrackWidget onNavigate={onNavigate} />
      <NewsSection onNavigate={onNavigate} />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner onNavigate={onNavigate} />
    </div>
  );
};
