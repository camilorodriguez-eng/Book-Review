import { useState, useEffect } from "react";
import { handleGetBook, handleSearch } from "../services/bookService";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);

  // obtener todos los libros
  useEffect(() => {
    const getBooks = async () => {
      try {
        const allBooks = await handleGetBook();
        setBooks(allBooks);
        setFilteredBooks(allBooks);
      } catch (error) {
        setError(error.message);
      }
    };
    getBooks();
  }, []);

  // buscar libros
  const searchBook = async (filters) => {
    console.log("Los filtros son", filters);
    const { title, category, rating } = filters;

    if (!title && !category && !rating) {
      setFilteredBooks(books);
      return;
    }

    try {
      const results = await handleSearch({ title, category, rating });
      setFilteredBooks(results && results.length > 0 ? results : []); 
    } catch (error) {
      setError(error.message || "Ha ocurrido un error al buscar los libros.");
    }
  };

  return {
    filteredBooks,
    searchBook,
    error,
  }
};

export default useBooks;
