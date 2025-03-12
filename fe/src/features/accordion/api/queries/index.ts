export const fetchAccordionStyles = async () => {
  const res = await fetch("http://localhost:3000/components/accordion");
  if (!res.ok) {
    throw new Error("Failed to fetch accordion styles");
  }
  return res.json();
};
