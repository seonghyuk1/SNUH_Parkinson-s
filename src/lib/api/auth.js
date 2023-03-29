import client from "./client";

export const login = (pw) =>
  client.post("auth/login", {
    name: "admin",
    birthdate: "1111-11-11",
    password: pw,
  });
