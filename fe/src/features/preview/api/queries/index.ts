import { authFetch } from "@/lib/authFetch.ts";

export const fetchCode = async (projectId: string, componentName: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/${componentName}/code`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.text();
};
