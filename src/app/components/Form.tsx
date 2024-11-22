import React, { useEffect, useState } from "react";
import { API_URL } from "@/app/util/constants";
import Link from "next/link";

interface BookFormProps {
    bookData?: {
        id: string; 
        title: string;
        author: string;
        year: string;
        genre: string;
    };
    onSuccess?: () => void; 
}

const BookForm: React.FC<BookFormProps> = ({ bookData, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        year: "",
        genre: "",
    });

    useEffect(() => {
        if (bookData) {
            setFormData(bookData); 
        }
    }, [bookData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isUpdate = !!bookData; 

        try {
            const response = await fetch(
                `${API_URL}/books/${isUpdate ? "update" : "save"}`,
                {
                    method: isUpdate ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(isUpdate ? { id: bookData?.id, ...formData } : formData),
                }
            );

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const result = await response.json();
            console.log(isUpdate ? "Libro actualizado" : "Libro agregado", result);
            alert(isUpdate ? "Libro actualizado con éxito!" : "Libro agregado con éxito!");
            if (onSuccess) onSuccess();
            setFormData({ title: "", author: "", year: "", genre: "" });
        } catch (error) {
            console.error(isUpdate ? "Error al actualizar el libro" : "Error al agregar el libro", error);
            alert("Hubo un error. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center text-black mt-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {bookData ? "Actualizar Libro" : "Agregar un Libro"}
                </h2>

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
                        placeholder="Título del libro"
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
                        placeholder="Autor del libro"
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
                        placeholder="Año de publicación"
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
                    {bookData ? "Actualizar Libro" : "Agregar Libro"}
                </button>
                <Link href="/Crud">
                    <button className="mt-2 w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200">
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default BookForm;
