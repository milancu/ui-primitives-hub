export const fetchDialogStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/dialog`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch dialog styles");
  }
  return res.json();
};
