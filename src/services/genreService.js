import http from "./httpService";
import config from "../config.json";

export async function getGenres() {
  const result = await http.get(config.apiEndpoint + "genres/");
  return result.data;
}
