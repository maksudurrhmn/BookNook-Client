export default function MyProfileLoading() {
  return (
    <main className="container mx-auto min-h-screen animate-pulse px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Page Heading */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="h-9 w-48 rounded-lg bg-surface-secondary" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-surface-secondary" />
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          {/* Avatar and User Info */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-surface-secondary" />

            <div className="mt-4 h-6 w-40 rounded bg-surface-secondary" />
            <div className="mt-2 h-4 w-28 rounded bg-surface-secondary" />
          </div>

          {/* Account Information */}
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-xl bg-surface p-4">
                <div className="h-5 w-5 shrink-0 rounded bg-surface-secondary" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded bg-surface-secondary" />
                  <div className="h-5 w-40 max-w-full rounded bg-surface-secondary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
