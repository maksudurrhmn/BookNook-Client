import Link from 'next/link';
import { BookOpen, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookOpen size={40} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Page Not Found
        </p>

        <h1 className="mt-4 text-7xl font-bold tracking-tight text-foreground">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Looks like this page is missing.
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          The page you're looking for doesn't exist or may have been moved. Let's get you back to
          your reading journey.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/books"
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-secondary"
          >
            <ArrowLeft size={17} />
            Explore Books
          </Link>
        </div>
      </div>
    </main>
  );
}
