import axios from "axios";

const apiEndPoint = "http://localhost:8000/api/";

export async function getGenres() {
  const result = await axios.get(apiEndPoint + "genres/");
  return result.data;
}
