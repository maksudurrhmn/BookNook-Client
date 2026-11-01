'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Suspense } from 'react';

const slides = [
  {
    subtitle: 'WELCOME TO BOOKNOOK',
    title: 'Discover Your Next Favorite Book',
    description:
      'Explore a world of stories, knowledge, and imagination. Find the perfect book for your next reading adventure.',
    button: 'Explore Books',
    href: '/books',
    image: '/images/hero-1.jpg',
  },
  {
    subtitle: 'YOUR NEXT CHAPTER STARTS HERE',
    title: 'Every Book Opens a New World',
    description: 'From timeless classics to modern favorites, discover stories worth remembering.',
    button: 'Browse Collection',
    href: '/books',
    image: '/images/hero-2.jpg',
  },
  {
    subtitle: 'READ. EXPLORE. REPEAT.',
    title: 'Make More Room for Reading',
    description:
      'Discover interesting books, build your collection, and enjoy a better reading experience.',
    button: 'Get Started',
    href: '/register',
    image: '/images/hero-3.jpg',
  },
];

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-6">
      <Suspense
        fallback={
          <div className="h-[420px] w-full animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-700" />
        }
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="overflow-hidden rounded-3xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex min-h-[420px] items-center overflow-hidden rounded-3xl bg-cover bg-center px-8 py-16 sm:px-14 lg:px-20"
                style={{
                  backgroundImage: `linear-gradient(90deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.35)), url(${slide.image})`,
                }}
              >
                <div className="relative z-10 max-w-2xl text-white">
                  <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-blue-300">
                    {slide.subtitle}
                  </p>

                  <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href={slide.href}
                    className="mt-8 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    {slide.button}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Suspense>
    </section>
  );
}
