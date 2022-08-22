import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "auth/jwt/create/";

export async function login(username, password) {
  const { data: result } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem("access", result.access);
  localStorage.setItem("refresh", result.refresh);
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("access");
    const data = jwtDecode(jwt);
    const user = {
      username: data.username,
      id: data.user_id,
      email: data.email,
    };
    return user;
  } catch (ex) {
    return null;
  }
}

export function loginWithJwt(jwtAccess, jwtRefresh) {
  localStorage.setItem("access", jwtAccess);
  localStorage.setItem("refresh", jwtRefresh);
}

export function getAuthorizationToken() {
  const accessToken = localStorage.getItem("access");
  if (accessToken) return `JWT ${accessToken}`;
  return null;
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getAuthorizationToken,
};
