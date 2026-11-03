export default function BookDetailsSkeleton() {
  return (
    <section className="container mx-auto min-h-screen px-4 py-12 animate-pulse">
      {/* Back Link Placeholder */}
      <div className="mb-8 h-5 w-40 rounded bg-muted/30" />

      {/* Main Grid Layout */}
      <div className="grid gap-10 rounded-3xl border border-border bg-background p-6 sm:p-10 md:grid-cols-2">
        {/* Book Cover Skeleton */}
        <div className="relative mx-auto aspect-3/4 w-full max-w-md overflow-hidden rounded-2xl bg-surface-secondary" />

        {/* Book Information Skeleton */}
        <div className="flex flex-col justify-center">
          {/* Category Badge */}
          <div className="h-8 w-24 rounded-full bg-primary/10" />

          {/* Title Placeholder */}
          <div className="mt-5 h-10 w-3/4 rounded bg-muted/40" />

          {/* Author Placeholder */}
          <div className="mt-3 h-5 w-48 rounded bg-muted/30" />

          {/* Copies Info Boxes */}
          <div className="my-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-surface p-4">
              <div className="h-4 w-20 rounded bg-muted/30" />
              <div className="mt-2 h-7 w-12 rounded bg-muted/40" />
            </div>
            <div className="rounded-xl bg-surface p-4">
              <div className="h-4 w-24 rounded bg-muted/30" />
              <div className="mt-2 h-7 w-12 rounded bg-muted/40" />
            </div>
          </div>

          {/* About Section */}
          <div>
            <div className="h-6 w-36 rounded bg-muted/40" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-full rounded bg-muted/30" />
              <div className="h-4 w-5/6 rounded bg-muted/30" />
              <div className="mt-2 h-4 w-2/3 rounded bg-muted/30" />
            </div>
          </div>

          {/* Availability Status Indicator */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-4.5 w-4.5 rounded-full bg-muted/30" />
            <div className="h-4 w-44 rounded bg-muted/30" />
          </div>

          {/* Action Button Placeholder */}
          <div className="mt-8 h-12 w-full rounded-xl bg-primary/30" />
        </div>
      </div>
    </section>
  );
}
