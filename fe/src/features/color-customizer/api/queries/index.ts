import { authFetch } from "@/lib/authFetch.ts";

export const fetchProjectColors = async (id: string) => {
  const res = await authFetch(`/projects/${id}/colors`);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};
