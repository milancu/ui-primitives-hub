export const fetchMenuStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/menu`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch menu styles");
  }
  return res.json();
};
