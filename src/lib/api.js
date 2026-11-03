import { authClient } from './auth-client';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all books with an optional limit
export async function getBooks(limit) {
  try {
    const query = limit ? `?limit=${limit}` : '';

    const response = await fetch(`${API_URL}/books${query}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

// Get latest books with a limit of 6
export async function getLatestBooks() {
  return getBooks(6);
}

// Get book details by ID
export async function getBookById(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      cache: 'no-store',
    });

    if (response.status === 404 || response.status === 400) {
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }

    const result = await response.json();

    return result.data || null;
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
}

// Add a new book
export async function addBook(bookData, token) {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to add book');
  }

  return result;
}

// Get books added by the logged-in user
export async function getMyBooks() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to view your books.');
  }

  const response = await fetch(`${API_URL}/books?mine=true`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    cache: 'no-store',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch your books.');
  }

  return result.data || [];
}

// Update a book
export async function updateBook(id, bookData) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to update this book.');
  }

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify(bookData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update book.');
  }

  return result;
}

// Delete a book
export async function deleteBook(id) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to delete this book.');
  }

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to delete book.');
  }

  return result;
}

// Borrow a book
export async function borrowBook(bookId) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to borrow a book.');
  }

  const response = await fetch(`${API_URL}/borrows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({ bookId }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to borrow book.');
  }

  return result;
}

// Get borrowing history
export async function getMyBorrows() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to view your borrowed books.');
  }

  const response = await fetch(`${API_URL}/borrows`, {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    cache: 'no-store',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to fetch borrowed books.');
  }

  return result.data || [];
}

// Return a borrowed book
export async function returnBorrow(borrowId) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error('Please log in to return a book.');
  }

  const response = await fetch(`${API_URL}/borrows/${borrowId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to return book.');
  }

  return result;
}
