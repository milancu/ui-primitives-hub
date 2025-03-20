import { authFetch } from "@/lib/authFetch.ts";

export const fetchAccordionStyles = async (projectId: string) => {
  const res = await authFetch(`/projects/${projectId}/components/accordion`);
  if (!res.ok) {
    throw new Error("Failed to fetch accordion styles");
  }
  return res.json();
};
