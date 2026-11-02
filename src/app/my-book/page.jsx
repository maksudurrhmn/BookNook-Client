import { getMyBooks } from '@/lib/api';
import MyBooks from '@/components/books/MyBooks';

export const metadata = {
  title: 'My Books | BookNook',
  description: 'Manage the books you have added to BookNook.',
};

export default async function MyBooksPage() {
  let books = [];
  let error = '';

  try {
    books = await getMyBooks();
  } catch (err) {
    error = err.message;
  }

  return <MyBooks initialBooks={books} error={error} />;
}
