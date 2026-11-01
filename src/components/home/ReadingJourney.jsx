import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function ReadingJourney() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-7 py-16 text-center text-white sm:px-12">
        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <BookOpen size={30} />
          </div>

          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Your Next Great Read Awaits</h2>

          <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
            Every great journey begins with a book. Explore our collection and discover stories that
            inspire, educate, and entertain.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Explore Books
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Join BookNook
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>
    </section>
  );
}
