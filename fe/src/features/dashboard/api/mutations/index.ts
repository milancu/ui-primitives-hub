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
    throw new Error("Network response was not ok");
  }

  return response.json();
};
