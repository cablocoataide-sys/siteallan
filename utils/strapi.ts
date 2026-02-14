export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export const fetchFromStrapi = async (path: string) => {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
  }
  return res.json();
};
