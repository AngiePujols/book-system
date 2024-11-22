import { useEffect, useState } from 'react'
import { Book } from '@/app/models/book.model'
import { API_URL } from '@/app/util/constants'
import { BookCard } from './BookCard'
import {Pagination, PaginationItem, PaginationCursor} from "@nextui-org/react";

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/books?page=${page}`)
      .then((response) => response.json())
      .then((data) => { 
        setBooks(data.books); 
        setTotal(data.total);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (<p>Loading...</p>);
  }

  return (
    <div className="hero">
      <div className="flex flex-1 pt-36 justify-center">
        <div className="grid grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onFavorite={() => {}} onReview={() => {}} />
          ))}
          <Pagination total={Math.ceil(total / 8)} page={page} initialPage={1} onChange={setPage} className='text-black text-2xl mt-4 '  />
        </div>
      </div>
    </div>
  );
};