import { authFetch } from "@/lib/authFetch.ts";

interface UpdateAvatarStyleProps {
  projectId: string;
  part: string;
  state: string;
  componentName: string;
  tailwind: string;
}

export const updateStyle = async ({
  componentName,
  part,
  state,
  projectId,
  tailwind,
}: UpdateAvatarStyleProps) => {
  const response = await authFetch(
    `/projects/${projectId}/components/${componentName}/${part}/${state}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tailwind: tailwind,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
