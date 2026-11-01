'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BookOpen, User, Tag, Library } from 'lucide-react';

export default function BookDetails({ book }) {
  const isAvailable = book.availableCopies > 0;

  return (
    <section className="container mx-auto min-h-screen px-4 py-12">
      <Link
        href="/books"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={18} />
        Back to All Books
      </Link>

      <div className="grid gap-10 rounded-3xl border border-border bg-background p-6 sm:p-10 md:grid-cols-2">
        {/* Book Cover */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-surface-secondary">
          <Image
            src={book.image}
            alt={book.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Book Information */}
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {book.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-foreground sm:text-4xl">{book.title}</h1>

          <p className="mt-3 flex items-center gap-2 text-muted">
            <User size={18} />
            By {book.author}
          </p>

          <div className="my-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-surface p-4">
              <p className="text-sm text-muted">Total Copies</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{book.totalCopies}</p>
            </div>

            <div className="rounded-xl bg-surface p-4">
              <p className="text-sm text-muted">Available Copies</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{book.availableCopies}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">About This Book</h2>

            <p className="mt-3 text-sm leading-7 text-muted">{book.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-muted">
              <Library size={18} />
              {isAvailable ? 'Available for borrowing' : 'Currently unavailable'}
            </span>
          </div>

          <button
            disabled={!isAvailable}
            className="mt-8 w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAvailable ? 'Borrow This Book' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </section>
  );
}
