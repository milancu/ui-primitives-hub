export const fetchAccordionStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/accordion`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch accordion styles");
  }
  return res.json();
};
