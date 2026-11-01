import Link from 'next/link';
import { getLatestBooks } from '@/lib/api';
import BookCard from '@/components/books/BookCard';

export default async function NewArrivals() {
  const books = await getLatestBooks();

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Fresh from the shelves
          </p>

          <h2 className="mt-2 text-3xl font-bold text-foreground">New Arrivals</h2>

          <p className="mt-2 text-muted">Discover the latest additions to our collection.</p>
        </div>

        <Link
          href="/books"
          className="text-sm font-semibold text-primary transition-opacity hover:opacity-70"
        >
          View All Books →
        </Link>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface py-16 text-center">
          <h3 className="text-lg font-semibold">No books available yet</h3>
          <p className="mt-2 text-sm text-muted">New books will appear here once they are added.</p>
        </div>
      )}
    </section>
  );
}
