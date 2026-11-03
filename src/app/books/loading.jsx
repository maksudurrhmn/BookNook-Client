export default function BooksLoading() {
  return (
    <section className="container mx-auto min-h-screen px-4 py-12 animate-pulse">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto h-4 w-40 rounded bg-surface-secondary" />

        <div className="mx-auto mt-4 h-10 w-56 rounded-lg bg-surface-secondary" />

        <div className="mx-auto mt-4 h-4 w-full max-w-md rounded bg-surface-secondary" />
      </div>

      {/* Search and Sorting */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="h-12 flex-1 rounded-xl bg-surface-secondary" />
        <div className="h-12 w-full rounded-xl bg-surface-secondary sm:w-44" />
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="h-9 w-20 rounded-full bg-surface-secondary" />
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-5 h-4 w-28 rounded bg-surface-secondary" />

      {/* Books Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            {/* Book Image */}
            <div className="h-64 bg-surface-secondary" />

            {/* Book Information */}
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 rounded bg-surface-secondary" />
              <div className="h-4 w-1/2 rounded bg-surface-secondary" />
              <div className="h-4 w-1/3 rounded bg-surface-secondary" />
              <div className="mt-4 h-10 w-full rounded-xl bg-surface-secondary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
