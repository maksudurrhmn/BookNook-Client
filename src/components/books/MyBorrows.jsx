'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Library, LoaderCircle, CheckCircle, RotateCcw } from 'lucide-react';

import { getMyBorrows, returnBorrow } from '@/lib/api';

export default function MyBorrows() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedBorrow, setSelectedBorrow] = useState(null);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const data = await getMyBorrows();
        setBorrows(data);
      } catch (err) {
        setError(err.message || 'Failed to load borrowing history.');
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      setReturningId(borrowId);
      setError('');
      setSuccess('');

      await returnBorrow(borrowId);

      setBorrows((prev) =>
        prev.map((borrow) =>
          borrow._id === borrowId
            ? {
                ...borrow,
                status: 'returned',
                returnedAt: new Date().toISOString(),
              }
            : borrow
        )
      );

      setSuccess('Book returned successfully!');
      setSelectedBorrow(null);
    } catch (err) {
      setError(err.message || 'Failed to return book.');
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-primary" size={36} />
      </div>
    );
  }

  return (
    <section className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your Library</p>

        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">My Borrows</h1>

        <p className="mt-3 text-muted">Keep track of the books you have borrowed.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600">
          <CheckCircle size={18} />
          {success}
        </div>
      )}

      {!error && borrows.length === 0 && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
          <Library size={48} className="text-muted" />

          <h2 className="mt-5 text-xl font-semibold text-foreground">No Borrowed Books Yet</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            You haven't borrowed any books yet. Explore our collection and find something
            interesting to read.
          </p>

          <Link
            href="/books"
            className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Explore Books
          </Link>
        </div>
      )}

      {borrows.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {borrows.map((borrow) => (
            <div
              key={borrow._id}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              <div className="relative aspect-[3/2] bg-surface-secondary">
                <Image
                  src={borrow.bookImage}
                  alt={borrow.bookTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-foreground">{borrow.bookTitle}</h2>

                <div className="mt-4 space-y-2 text-sm text-muted">
                  <p>Borrowed: {new Date(borrow.borrowedAt).toLocaleDateString()}</p>

                  <p>
                    Status:{' '}
                    <span
                      className={
                        borrow.status === 'active'
                          ? 'font-semibold text-green-600'
                          : 'font-semibold text-muted'
                      }
                    >
                      {borrow.status === 'active' ? 'Active' : 'Returned'}
                    </span>
                  </p>

                  {borrow.returnedAt && (
                    <p>Returned: {new Date(borrow.returnedAt).toLocaleDateString()}</p>
                  )}
                </div>

                {borrow.status === 'active' && (
                  <button
                    onClick={() => setSelectedBorrow(borrow)}
                    disabled={returningId === borrow._id}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {returningId === borrow._id ? (
                      <>
                        <LoaderCircle size={17} className="animate-spin" />
                        Returning...
                      </>
                    ) : (
                      <>
                        <RotateCcw size={17} />
                        Return Book
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBorrow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Library size={24} />
            </div>

            <h2 className="text-xl font-semibold text-foreground">Return this book?</h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Are you sure you want to return{' '}
              <span className="font-semibold text-foreground">{selectedBorrow.book?.title}</span>?
              This action will update your borrowing status.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedBorrow(null)}
                disabled={returningId === selectedBorrow._id}
                className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-secondary disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={() => handleReturn(selectedBorrow._id)}
                disabled={returningId === selectedBorrow._id}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {returningId === selectedBorrow._id ? 'Returning...' : 'Confirm Return'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
