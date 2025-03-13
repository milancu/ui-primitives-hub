export const fetchAvatarStyles = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/components/avatar`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch avatar styles");
  }
  return res.json();
};
