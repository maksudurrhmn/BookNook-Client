export default function MyBooksLoading() {
  return (
    <section className="container mx-auto min-h-screen animate-pulse px-4 py-12">
      <div className="mb-10 text-center">
        {/* Library Icon */}
        <div className="mx-auto h-14 w-14 rounded-2xl bg-surface-secondary" />

        {/* Heading */}
        <div className="mx-auto mt-5 h-10 w-48 rounded-lg bg-surface-secondary" />

        {/* Description */}
        <div className="mx-auto mt-3 h-4 w-full max-w-xl rounded bg-surface-secondary" />
      </div>
    </section>
  );
}
