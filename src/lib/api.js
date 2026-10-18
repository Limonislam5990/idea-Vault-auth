// Single place for the backend URL.
// In production, a missing or "localhost" value falls back to the deployed backend.
const PROD_API = "https://idea-vault-backend-eight.vercel.app";
const envUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL || "";
const useProdFallback =
  process.env.NODE_ENV === "production" && (!envUrl || envUrl.includes("localhost"));

export const API_URL = (useProdFallback ? PROD_API : envUrl || "http://localhost:5000").replace(/\/$/, "");
