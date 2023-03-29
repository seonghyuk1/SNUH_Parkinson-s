import client from "./client";

export const getTestsByTypeAndUserId = (testType, userId) =>
  client.get(`/tests/${testType}`, {
    params: {
      userId: userId,
      size: 1000,
    },
  });
