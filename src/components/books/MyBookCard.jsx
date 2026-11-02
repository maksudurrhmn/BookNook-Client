'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

export default function MyBookCard({ book, onEdit, onDelete }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/books/${book._id}`}>
        <div className="relative h-64 overflow-hidden bg-surface-secondary">
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <span className="text-xs font-medium text-primary">{book.category}</span>

        <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-foreground">{book.title}</h3>

        <p className="mt-1 text-sm text-muted">By {book.author}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-muted">
            {book.availableCopies} / {book.totalCopies} available
          </span>

          <Link href={`/books/${book._id}`} className="font-medium text-primary hover:underline">
            View Details →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
          <button
            onClick={() => onEdit(book)}
            className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(book)}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
