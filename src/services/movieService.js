import http from "./httpService";
import config from "../config.json";

export async function getMovies() {
  const result = await http.get(config.apiEndpoint + "movies/");
  return result.data;
}

export async function getMovie(id) {
  const result = await http.get(config.apiEndpoint + "movies/" + id);
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
    const result = await http.put(
      `${config.apiEndpoint}movies/${movie.id}/`,
      m
    );
    return result.data;
  } else {
    const result = await http.post(config.apiEndpoint + "movies/", m);
    return result.data;
  }
}

export async function deleteMovie(id) {
  const result = await http.delete(config.apiEndpoint + "movies/" + id);
  return result.data;
}
