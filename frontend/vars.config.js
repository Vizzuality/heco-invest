export const NODE_ENV = process.env.NODE_ENV;

export const FRONTEND_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_FRONTEND_URL;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const PROXY_BACKEND = process.env.NEXT_PUBLIC_PROXY_BACKEND;

export const MAPBOX_API_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
export const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
