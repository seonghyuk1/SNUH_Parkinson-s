import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api"
      : process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const setToken = ({ token }) =>
  (client.defaults.headers.common["X-AUTH-TOKEN"] = token ?? null);

export default client;
