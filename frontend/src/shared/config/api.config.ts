export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002/api",
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};
