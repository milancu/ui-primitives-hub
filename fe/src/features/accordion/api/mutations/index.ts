interface UpdateAccordionStyleProps {
  name: string;
  value: string;
  attribute: string;
}

export const updateAccordionStyle = async ({
  name,
  value,
  attribute,
}: UpdateAccordionStyleProps) => {
  const response = await fetch(`http://localhost:3000/accordion`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: name,
      data: {
        [attribute]: value,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
