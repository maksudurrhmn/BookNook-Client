import { getBooks } from '@/lib/api';
import AllBooks from '@/components/books/AllBooks';

export const metadata = {
  title: 'All Books',
  description: 'Explore the complete BookNook library collection.',
};

export default async function BooksPage() {
  const books = await getBooks(50); // Fetch all books without a limit

  return <AllBooks initialBooks={books} />;
}
