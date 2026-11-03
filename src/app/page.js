import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import ReadingJourney from '@/components/home/ReadingJourney';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import NewArrivalsSkeleton from '@/components/skeletons/NewArrivalsSkeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>
      <WhyChooseUs />
      <ReadingJourney />
    </>
  );
}
