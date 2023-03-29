import client from "./client";

export const getUsers = () =>
  client.get("/users", {
    params: { size: 1000 },
  });
