import { authFetch } from "@/lib/authFetch.ts";

export const updateColors = async ({
  id,
  color,
  value,
  theme,
}: {
  id: string;
  theme:string;
  color: string;
  value: { l: number; c: number; h: number };
}) => {
  const response = await authFetch(`/projects/${id}/colors`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      color,
      value,
      theme
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};
