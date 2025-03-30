import { authFetch } from "@/lib/authFetch.ts";

export const fetchProjects = async () => {
  const res = await authFetch("/projects/");

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};

export const fetchProject = async (id: string) => {
  const res = await authFetch(`/projects/${id}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};

export const fetchProjectName = async (id: string) => {
  const res = await authFetch(`/projects/${id}/metadata`);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};
