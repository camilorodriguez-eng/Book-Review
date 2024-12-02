import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiChevronDown, FiStar } from "react-icons/fi";
import avatar from "../../img/avatar.png";

function Header({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // function to close session
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);
    console.log("Categoría seleccionada:", selectedCategory);

    handleSearch({
      title: filterTitle,
      category: selectedCategory,
      rating: filterRating,
    })
  };

  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setFilterRating(selectedRating);
    console.log("Rating seleccionado:", selectedRating);
    handleSearch({
      title: filterTitle,
      category: filterCategory,
      rating: selectedRating,
    })
  };

  // funcion para manejar la busqueda
  const handleSearch = (filters) => {
    console.log("buscando libros con filtros", filters);
    onSearch(filters);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 fixed w-full top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-blue-600">BookReviews</h1>
        <div className="flex-1 max-w-2xl relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch({
                  title: filterTitle,
                  category: filterCategory,
                  rating: filterRating
                })
              }
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Select genre"
              value={filterCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All genres</option>
              <option value="Poesia">Poesia</option>
              <option value="Aventura">Aventura</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia Ficción">Ciencia Ficción</option>
              <option value="Epopeya">Epopeya</option>
              <option value="Historico">Historico</option>
              <option value="Realismo Magico">Realismo Magico</option>
              <option value="Filosofia">Filosofia</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Select rating"
              value={filterRating}
              onChange={handleRatingChange}
            >
              <option value="">All ratings</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMenu}
            >
              <img
                src={avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <FiChevronDown
                className={`transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                  Settings
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
