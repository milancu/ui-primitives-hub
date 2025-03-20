interface UpdateAccordionStyleProps {
  part: string;
  value: string;
  attribute: string;
}

export const updateAccordionStyle = async ({
                                             part,
  value,
  attribute,
}: UpdateAccordionStyleProps) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/accordion`,
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
