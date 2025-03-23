import { authFetch } from "@/lib/authFetch.ts";

export const fetchHierarchy = async (
  projectId: string,
  componentName: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/${componentName}/hierarchy`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchParts = async (projectId: string, componentName: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/${componentName}/parts`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchPartStates = async (
  projectId: string,
  part: string,
  componentName: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/${componentName}/${part}/states`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchPartStateStyle = async (
  projectId: string,
  part: string,
  state: string,
  componentName: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/${componentName}/${part}/${state}`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};
