import { authFetch } from "@/lib/authFetch.ts";

interface UpdateAccordionStyleProps {
  part: string;
  value: string;
  attribute: string;
  projectId: string;
}

export const updateAccordionStyle = async ({
  projectId,
  part,
  value,
  attribute,
}: UpdateAccordionStyleProps) => {
  const response = await authFetch(
    `/projects/${projectId}/components/accordion`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        part,
        data: {
          [attribute]: value,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
