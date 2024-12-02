import connection from "../database/database.js";

// en el controlador de obtener los libros hace falta crear los joins para obtener el nombre del autor

// controlador get para obtener libros
export const getBook = async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT Book.title, Book.category, Author.name AS author_name, AVG(Rating.rating) AS average_rating FROM Book JOIN Author ON Book.id_author = Author.id_author LEFT JOIN Rating ON Book.id_book = Rating.id_book GROUP BY Book.id_book"
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error retrieving books" });
  }
};

// controlador get para buscar libro
export const searchBook = async (req, res) => {
  const { title, category, rating } = req.query;

  try {
    let query = `SELECT Book.title, Book.category, AVG(Rating.rating) AS average_rating FROM Book LEFT JOIN Rating ON Book.id_book = Rating.id_book WHERE 1=1`;
    const queryParams = [];

    if (title) {
      query += " AND Book.title LIKE ?";
      queryParams.push(`%${title}%`);
    }
    if (category) {
      query += " AND Book.category = ?";
      queryParams.push(category);
    }

    query += " GROUP BY Book.id_book, Book.title, Book.category";

    if (rating) {
      query += " HAVING average_rating >= ?";
      queryParams.push(Number(rating));
    }

    const [rows] = await connection.query(query, queryParams);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};
