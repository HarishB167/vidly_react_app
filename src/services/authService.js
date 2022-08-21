import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "auth/jwt/create/";

export function login(username, password) {
  return http.post(apiEndpoint, { username, password });
}
