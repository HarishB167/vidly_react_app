import http from "./httpService";

export async function getMovies() {
  const result = await http.get("/movies/");
  return result.data;
}

export async function getMovie(id) {
  const result = await http.get("/movies/" + id);
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
    const result = await http.put(`/movies/${movie.id}/`, m);
    return result.data;
  } else {
    const result = await http.post("/movies/", m);
    return result.data;
  }
}

export async function deleteMovie(id) {
  const result = await http.delete("/movies/" + id);
  return result.data;
}
