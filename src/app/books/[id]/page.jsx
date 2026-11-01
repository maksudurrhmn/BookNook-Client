import { notFound } from 'next/navigation';
import { getBookById } from '@/lib/api';
import BookDetails from '@/components/books/BookDetails';

export const metadata = {
  title: 'Book Details',
};

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
