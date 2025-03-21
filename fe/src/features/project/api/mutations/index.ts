import { authFetch } from "@/lib/authFetch.ts";

export const addProject = async ({ name }: { name: string }) => {
  const response = await authFetch("/projects/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(error.error);
    throw new Error(error.error);
  }

  return response.json();
};

export const deleteProject = async (id: string) => {
  const response = await authFetch(`/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.status === 204 ? null : response.json();
};

export const updateProject = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const response = await authFetch(`/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
