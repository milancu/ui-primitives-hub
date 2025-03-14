interface UpdateDialogStyleProps {
  name: string;
  value: string;
  attribute: string;
}

export const updateDialogStyle = async ({
  name,
  value,
  attribute,
}: UpdateDialogStyleProps) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/dialog`,
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
