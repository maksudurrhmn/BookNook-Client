import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import ReadingJourney from '@/components/home/ReadingJourney';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="text-center py-10">Loading new arrivals...</div>}>
        <NewArrivals />
      </Suspense>
      <WhyChooseUs />
      <ReadingJourney />
    </>
  );
}
