import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({ book }) {
  return (
    <Link
      href={`/books/${book._id}`}
      className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-64 overflow-hidden bg-surface-secondary">
        <Image
          src={book.image}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <span className="text-xs font-medium text-primary">{book.category}</span>

        <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-foreground">{book.title}</h3>

        <p className="mt-1 text-sm text-muted">By {book.author}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">{book.availableCopies} copies available</span>

          <span className="font-medium text-primary">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
