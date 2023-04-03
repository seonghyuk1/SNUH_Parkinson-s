import client from "./client";

export const getUser = (userId) => client.get(`/users/${userId}`);

export const getUsers = (page) =>
  client.get("/users", {
    params: { size: 10, page },
  });
