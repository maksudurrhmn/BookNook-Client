'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import BookCard from './BookCard';

const categories = ['All', 'Fiction', 'Science', 'History', 'Kids', 'Others'];

export default function AllBooks({ initialBooks }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');

  const filteredBooks = useMemo(() => {
    let result = [...initialBooks];

    // Search by title or author
    if (search.trim()) {
      const term = search.toLowerCase().trim();

      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (category !== 'All') {
      result = result.filter((book) => book.category === category);
    }

    // Sort books
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialBooks, search, category, sort]);

  return (
    <section className="container mx-auto min-h-screen px-4 py-12">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Explore Our Collection
        </p>

        <h1 className="mt-3 text-4xl font-bold text-foreground">All Books</h1>

        <p className="mx-auto mt-3 max-w-xl text-muted">
          Discover your next favorite book from our growing collection.
        </p>
      </div>

      {/* Search and Sorting */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book title or author..."
            className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4">
          <SlidersHorizontal size={18} className="text-muted" />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-transparent py-3 text-sm text-foreground outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              category === item
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-background text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-5">
        <p className="text-sm text-muted">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
        </p>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface py-20 text-center">
          <h2 className="text-xl font-semibold text-foreground">No books found</h2>

          <p className="mt-2 text-sm text-muted">Try changing your search or category filter.</p>

          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setSort('newest');
            }}
            className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
