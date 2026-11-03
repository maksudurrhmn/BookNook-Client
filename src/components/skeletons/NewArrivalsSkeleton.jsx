export default function NewArrivalsSkeleton() {
  return (
    <section className="container mx-auto animate-pulse px-4 py-16">
      {/* Section Heading */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="h-4 w-36 rounded bg-surface-secondary" />

          <div className="mt-3 h-9 w-52 rounded-lg bg-surface-secondary" />

          <div className="mt-3 h-4 w-72 max-w-full rounded bg-surface-secondary" />
        </div>

        {/* View All Books Link */}
        <div className="h-4 w-28 rounded bg-surface-secondary" />
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="h-64 bg-surface-secondary" />

            <div className="space-y-3 p-5">
              <div className="h-3 w-20 rounded bg-surface-secondary" />
              <div className="h-5 w-3/4 rounded bg-surface-secondary" />
              <div className="h-4 w-1/2 rounded bg-surface-secondary" />
              <div className="mt-4 h-9 w-full rounded-lg bg-surface-secondary" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
