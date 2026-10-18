// Single place for the backend URL.
// In production the live backend is used, whatever the env variable says.
const PROD_API = "https://idea-vault-backend-eight.vercel.app";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? PROD_API
    : (process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000").replace(/\/$/, "");