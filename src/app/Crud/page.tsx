"use client";
import React, { useEffect, useState } from "react";
import { Book } from "@/app/models/book.model";
import { API_URL } from '@/app/util/constants'
import { getKeyValue } from "@nextui-org/react"; 
import Link from "next/link";

function crud() {
const [books, setBooks] = useState<Book[]>([]);
const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/Getbooks`)
      .then((response) => response.json())
      .then((data) => { 
        setBooks(data); 
      })
      .catch((error) => setError(error))
  }, []);

  function handleDelete(id: string): void {
    fetch(`${API_URL}/books/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      })
      .catch((error) => setError(error));
  }

  return (
  
    <div className="m-10 p-8 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <Link href="/Add">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-6 rounded">Add Book</button>
      </Link>
       <table className="min-w-full divide-y shadow-lg rounded-lg">
        <thead className="bg-gray-800 text-white">
        <tr>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Title</th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Author</th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Year</th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200"> 
          {books.map((book) => (
            <tr key={book.id}  className="px-6 py-4 text-lg text-black">
              <td className="hover:bg-gray-100 transition-colors">{book.title}</td>
              <td className="hover:bg-gray-100 transition-colors">{book.author}</td>
              <td className="hover:bg-gray-100 transition-colors">{book.year}</td>
              <td className="hover:bg-gray-100 transition-colors">
               <Link href={`/Edit/${book.id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mx-2 rounded">Edit</button>
                </Link>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
            </td>
            </tr>
          ))}         
        </tbody>
        </table>
    </div>
    </div>
  );

}

export default crud;