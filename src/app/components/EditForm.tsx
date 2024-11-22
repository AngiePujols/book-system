"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/app/util/constants";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const UpdateBookForm = ({ bookId }: { bookId: string }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial book data
    setIsLoading(true);
    fetch(`${API_URL}/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => setError("Failed to load book data"))
      .finally(() => setIsLoading(false));
  }, [bookId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (book) {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/books/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error("Failed to update the book");
      }

      alert("Book updated successfully!");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book data available</p>;

  return (
    <form onSubmit={handleUpdate} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Update Book</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title:</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Author:</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Year:</label>
        <input
          type="number"
          name="year"
          value={book.year}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Update Book
      </button>
    </form>
  );
};

export default UpdateBookForm;
