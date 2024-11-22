import { useEffect, useState } from 'react'
import { Book } from '../models/book.model'
import { Review } from '../models/review.model'
import { API_URL } from '../util/constants'
import Image from 'next/image'

type BookCardProps = {
  book: Book;
  onFavorite: (book: Book) => void;
  onReview: (review: Review) => void;
};

export const BookCard = ({ book, onFavorite, onReview }: BookCardProps) => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${API_URL}/books/${book.id}/reviews`)
  //     .then((response) => response.json())
  //     .then((data) => setReviews(data))
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));
  // }, [book.id]);

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{book.title}</h2>
        {/* Botón de favoritos */}
        {/* <button
          className={`text-2xl ${
            book.favorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={() => onFavorite(book)}
        >
          {book.favorite ? "❤️" : "🤍"}
        </button> */}
      </div>

      {/* Content */}
      <div className="flex gap-6 mb-6">
        {/* Imagen */}
        <div className="w-1/3">
          <Image
            src="https://www.writersdigest.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_300/MTcxMDY0NzcxMzIzNTY5NDEz/image-placeholder-title.webp"
            alt={book.title}
            width={200}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Información */}
        <div className="w-2/3">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Autor:</span> {book.author}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Año:</span> {book.year}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Género:</span> {book.genre}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reseñas</h3>
        {loading ? (
          <p className="text-gray-500 italic">Cargando reseñas...</p>
        ) : (
          <div className="space-y-2">
            {/* Aquí puedes mapear las reseñas */}
            {/* {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))} */}
          </div>
        )}

        <button
          className="mt-3 w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
          onClick={() => setShow(!show)}
        >
          {show ? "Ocultar reseñas" : "Mostrar reseñas"}
        </button>

        {/* Formulario de reseñas */}
        {/* {show && <ReviewForm bookId={book.id} onReview={onReview} />} */}
      </div>
    </div>
  );
};