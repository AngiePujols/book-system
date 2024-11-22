// components/EditBookForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { API_URL } from "@/app/util/constants";

interface EditBookFormProps {
  bookData: {
    id: string;
    title: string;
    author: string;
    year: string;
    genre: string;
  } | null; // Permitir que bookData sea null en caso de que aún no se haya cargado
  onSuccess: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ bookData, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

  // Asegurarse de que bookData esté disponible antes de actualizar el estado
  useEffect(() => {
    if (bookData) {
      setFormData({
        title: bookData.title,
        author: bookData.author,
        year: bookData.year,
        genre: bookData.genre,
      });
    }
  }, [bookData]);

  // Si los datos no están disponibles, muestra un estado de carga
  if (!bookData) {
    return <div>Cargando...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/books/update/${bookData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el libro");
      }

      const result = await response.json();
      console.log("Libro actualizado:", result);
      alert("Libro actualizado con éxito!");
      onSuccess(); // Llamar al callback para redirigir
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      alert("Hubo un error al actualizar el libro. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Libro</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-medium">
          Autor
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-gray-700 font-medium">
          Año
        </label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="genre" className="block text-gray-700 font-medium">
          Género
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          required
        >
          <option value="" disabled>
            Selecciona un género
          </option>
          <option value="Ficción">Ficción</option>
          <option value="No Ficción">No Ficción</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Misterio">Misterio</option>
          <option value="Aventura">Aventura</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        Actualizar Libro
      </button>
    </form>
  );
};

export default EditBookForm;
