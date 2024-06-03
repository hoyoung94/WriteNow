

export const fetchRelatedBooks = async (query) => {
    const response = await fetch(`http://127.0.0.1:8000/api/trends/related_books/?query=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };