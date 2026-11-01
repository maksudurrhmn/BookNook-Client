const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getLatestBooks() {
  return getBooks(6);
}
