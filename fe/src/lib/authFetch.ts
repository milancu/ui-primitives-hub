import { getAuth } from "firebase/auth";

const BE_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const authFetch = async (path: string, options?: RequestInit) => {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();

  const headers = {
    ...(options?.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${BE_API_URL}${path}`, {
    ...options,
    headers,
  });
};
