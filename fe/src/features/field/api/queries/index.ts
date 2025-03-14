export const fetchFieldStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/field`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch field styles");
  }
  return res.json();
};
