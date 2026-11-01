const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLatestBooks() {
  try {
    const response = await fetch(`${API_URL}/books?limit=6`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error('Error fetching latest books:', error);
    return [];
  }
}
