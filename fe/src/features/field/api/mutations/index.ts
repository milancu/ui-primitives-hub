interface UpdateStyleProps {
  name: string;
  value: string;
  attribute: string;
}

export const updateFieldStyle = async ({
                                         name,
                                         value,
                                         attribute,
                                       }: UpdateStyleProps) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/field`,
    {
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
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};