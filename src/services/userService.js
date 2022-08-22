import http from "./httpService";

const apiEndpoint = "/auth/users/";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    username: user.name,
    password: user.password,
  });
}
