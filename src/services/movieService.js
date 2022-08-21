import axios from "axios";

const apiEndPoint = "http://localhost:8000/api/";

export async function getMovies() {
  const result = await axios.get(apiEndPoint + "movies/");
  return result.data;
}

export async function getMovie(id) {
  const result = await axios.get(apiEndPoint + "movies/" + id);
  return result.data;
}

export async function saveMovie(movie) {
  const m = {
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    genre: movie.genreId,
  };
  if (movie.id) {
    const result = await axios.put(`${apiEndPoint}movies/${movie.id}/`, m);
    return result.data;
  } else {
    const result = await axios.post(apiEndPoint + "movies/", m);
    return result.data;
  }
}

export async function deleteMovie(id) {
  const result = await axios.delete(apiEndPoint + "movies/" + id);
  return result.data;
}
