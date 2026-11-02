'use client';

import { useEffect, useState } from 'react';
import { getMyBooks } from '@/lib/api';
import BookCard from './BookCard';
import { Library, RefreshCw } from 'lucide-react';

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await getMyBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message || 'Failed to load your books.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <section className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Library size={28} />
        </div>

        <h1 className="mt-5 text-4xl font-bold text-foreground">My Books</h1>

        <p className="mx-auto mt-3 max-w-xl text-muted">
          Manage the books you have contributed to our library.
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-60 items-center justify-center">
          <RefreshCw size={28} className="animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-border bg-surface py-16 text-center">
          <p className="text-muted">{error}</p>

          <button
            onClick={fetchMyBooks}
            className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      ) : books.length > 0 ? (
        <>
          <p className="mb-6 text-sm text-muted">
            You have added {books.length} {books.length === 1 ? 'book' : 'books'}.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-border bg-surface py-20 text-center">
          <Library size={40} className="mx-auto text-muted" />

          <h2 className="mt-4 text-xl font-semibold text-foreground">No Books Added Yet</h2>

          <p className="mt-2 text-sm text-muted">Books you add to BookNook will appear here.</p>

          <a
            href="/add-book"
            className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Add Your First Book
          </a>
        </div>
      )}
    </section>
  );
}
