import { authFetch } from "@/lib/authFetch.ts";

export const searchProjects = async (searchTerm: string) => {
  const params = new URLSearchParams({ q: searchTerm });
  const res = await authFetch(`/projects/search?${params}`);

  if (!res.ok) {
    throw new Error("Failed to search projects");
  }

  return res.json();
};
