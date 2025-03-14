export const fetchFieldsetStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/fieldset`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch fieldset styles");
  }
  return res.json();
};
