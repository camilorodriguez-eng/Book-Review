  import { FiStar } from "react-icons/fi";
  import imageMap from "../../img/imageMap.js";

  function BookGrid({ books }) {
    const getImagePath = (title) => {
      const fileName = imageMap[title];
      if (fileName) {
        return new URL(`../../img/${fileName}`, import.meta.url).href;
      }
      return new URL(`../../img/error.webp`, import.meta.url).href;
    };
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform"
            >
              <img
                src={getImagePath(book.title)}
                alt={`${book.title} cover`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-2">{book.author_name}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                    {book.category}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={
                          index < Math.floor(book.average_rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                    <span>{book.average_rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    );
  }

  export default BookGrid;
