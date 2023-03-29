import axios from "axios";

const client = axios.create();

client.defaults.baseURL = process.env.REACT_APP_DB_HOST;
client.defaults.withCredentials = true;

export const setToken = ({ token }) =>
  (client.defaults.headers.common["X-AUTH-TOKEN"] = token ?? null);

export default client;
