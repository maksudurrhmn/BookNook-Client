'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Library, X, CheckCircle, LoaderCircle } from 'lucide-react';

import { borrowBook } from '@/lib/api';

export default function BookDetails({ book }) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isAvailable = book.availableCopies > 0;

  const handleBorrow = async () => {
    try {
      setIsBorrowing(true);
      setError('');
      setMessage('');

      await borrowBook(book._id);

      setMessage('Book borrowed successfully!');
      setIsModalOpen(false);

      // Refresh the server-fetched book information.
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsBorrowing(false);
    }
  };

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
            <Library size={18} className="text-muted" />

            <span className="text-sm text-muted">
              {isAvailable ? 'Available for borrowing' : 'Currently unavailable'}
            </span>
          </div>

          {message && (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600">
              <CheckCircle size={18} />
              {message}
            </p>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-500">
              <p>{error}</p>
              {error.toLowerCase().includes('log in') && (
                <Link href="/login" className="mt-2 inline-block font-semibold underline">
                  Go to Login
                </Link>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setError('');
              setIsModalOpen(true);
            }}
            disabled={!isAvailable}
            className="mt-8 w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAvailable ? 'Borrow This Book' : 'Currently Unavailable'}
          </button>
        </div>
      </div>

      {/* Borrow Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => !isBorrowing && setIsModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="borrow-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isBorrowing}
              aria-label="Close modal"
              className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground disabled:opacity-50"
            >
              <X size={20} />
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Library size={24} />
            </div>

            <h2 id="borrow-modal-title" className="text-xl font-bold text-foreground">
              Confirm Borrowing
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Are you sure you want to borrow{' '}
              <span className="font-semibold text-foreground">{book.title}</span>?
            </p>

            <p className="mt-2 text-sm text-muted">Available copies: {book.availableCopies}</p>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isBorrowing}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleBorrow}
                disabled={isBorrowing}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isBorrowing ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Borrowing...
                  </>
                ) : (
                  'Confirm Borrow'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
