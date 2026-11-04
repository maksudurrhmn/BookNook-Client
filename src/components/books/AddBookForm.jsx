'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookPlus } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { addBook } from '@/lib/api';
import toast from 'react-hot-toast';

const categories = ['Fiction', 'Science', 'History', 'Kids', 'Others'];

const initialFormData = {
  title: '',
  author: '',
  category: 'Fiction',
  image: '',
  description: '',
  totalCopies: 1,
};

export default function AddBookForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === 'totalCopies' ? value : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
      setIsSubmitting(true);

      // Get the current user's JWT.
      const { data, error: tokenError } = await authClient.token();

      if (tokenError || !data?.token) {
        router.push('/login');
        return;
      }

      const bookData = {
        ...formData,
        totalCopies: Number(formData.totalCopies),
      };

      await addBook(bookData, data.token);

      setSuccess('Book added successfully!');
      toast.success('Book added successfully!');
      setFormData(initialFormData);

      setTimeout(() => {
        router.push('/books');
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
    }
  };

  return (
    <section className="container mx-auto min-h-screen max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <BookPlus size={28} />
        </div>

        <h1 className="mt-5 text-3xl font-bold text-foreground">Add a New Book</h1>

        <p className="mt-2 text-muted">Share a new addition with the BookNook community.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-border bg-background p-6 sm:p-8"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-foreground">
            Book Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            maxLength={150}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-2 block text-sm font-medium text-foreground">
            Author
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author's name"
            required
            maxLength={100}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
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
            <label htmlFor="totalCopies" className="mb-2 block text-sm font-medium text-foreground">
              Total Copies
            </label>
            <input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min="1"
              step="1"
              value={formData.totalCopies}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-medium text-foreground">
            Book Cover Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description about the book..."
            rows={5}
            required
            maxLength={2000}
            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition focus:border-primary"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="rounded-xl bg-green-500/10 p-3 text-sm text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </section>
  );
}
