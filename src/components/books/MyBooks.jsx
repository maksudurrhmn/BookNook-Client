'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyBooks, updateBook, deleteBook } from '@/lib/api';
import MyBookCard from './MyBookCard';
import { Library, RefreshCw, X } from 'lucide-react';

const categories = ['Fiction', 'Science', 'History', 'Kids', 'Others'];

export default function MyBooks() {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const handleEdit = (book) => {
    setMessage('');
    setSelectedBook({
      ...book,
      totalCopies: String(book.totalCopies),
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setSelectedBook((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setMessage('');

      const updatedData = {
        title: selectedBook.title,
        author: selectedBook.author,
        category: selectedBook.category,
        image: selectedBook.image,
        description: selectedBook.description,
        totalCopies: Number(selectedBook.totalCopies),
      };

      await updateBook(selectedBook._id, updatedData);

      setSelectedBook(null);
      setMessage('Book updated successfully!');

      await fetchMyBooks();
      router.refresh();
    } catch (err) {
      setMessage(err.message || 'Failed to update book.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setMessage('');

      await deleteBook(deleteTarget._id);

      setDeleteTarget(null);
      setMessage('Book deleted successfully!');

      await fetchMyBooks();
      router.refresh();
    } catch (err) {
      setMessage(err.message || 'Failed to delete book.');
      setDeleteTarget(null);
    }
  };

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

      {message && (
        <div className="mb-6 rounded-xl bg-primary/10 p-4 text-center text-sm text-primary">
          {message}
        </div>
      )}

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
              <MyBookCard
                key={book._id}
                book={book}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
              />
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

      {/* Edit Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Edit Book</h2>

              <button
                onClick={() => setSelectedBook(null)}
                className="rounded-lg p-2 text-muted hover:bg-surface"
                aria-label="Close edit form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              {[
                { name: 'title', label: 'Book Title', type: 'text' },
                { name: 'author', label: 'Author', type: 'text' },
                { name: 'image', label: 'Cover Image URL', type: 'url' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {field.label}
                  </label>

                  <input
                    name={field.name}
                    type={field.type}
                    value={selectedBook[field.name] || ''}
                    onChange={handleEditChange}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
                  />
                </div>
              ))}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Category</label>

                  <select
                    name="category"
                    value={selectedBook.category}
                    onChange={handleEditChange}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Total Copies
                  </label>

                  <input
                    name="totalCopies"
                    type="number"
                    min="1"
                    step="1"
                    value={selectedBook.totalCopies}
                    onChange={handleEditChange}
                    required
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Description
                </label>

                <textarea
                  name="description"
                  value={selectedBook.description || ''}
                  onChange={handleEditChange}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6">
            <h2 className="text-xl font-bold text-foreground">Delete Book?</h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Are you sure you want to delete "{deleteTarget.title}"? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-surface"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
