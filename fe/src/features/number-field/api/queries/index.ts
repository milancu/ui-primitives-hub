export const fetchNumberFieldStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/number-field`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch number field styles");
  }
  return res.json();
};
