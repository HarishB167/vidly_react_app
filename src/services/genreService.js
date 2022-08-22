import http from "./httpService";

export async function getGenres() {
  const result = await http.get("/genres/");
  return result.data;
}
