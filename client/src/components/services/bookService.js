  const API_URL = "http://localhost:4000/api";

// peticion GET PARA OBTENER LIBROS
export const handleGetBook = async () => {
  try {
    const response = await fetch(`${API_URL}/book`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error fetching books");
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// peticion get para buscar libro
export const handleSearch = async (filters) =>{

  const { title, category, rating } = filters;

  let url = `${API_URL}/search?`;
  const queryParams = [];

  if(title) queryParams.push(`title=${encodeURIComponent(title)}`);
  if(category) queryParams.push(`category=${encodeURIComponent(category)}`);
  if(rating) queryParams.push(`rating=${encodeURIComponent(rating)}`);

  if (queryParams.length > 0) {
    url += queryParams.join("&");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    console.log("la url es", url);

    if (!response.ok) throw new Error("Error fetching books");
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
