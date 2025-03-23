import { authFetch } from "@/lib/authFetch.ts";

export const fetchFieldHierarchy = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/field/hierarchy`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchFieldParts = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/field/parts`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchFieldPartStates = async (
  projectId: string,
  part: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/field/${part}/states`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchFieldPartState = async (
  projectId: string,
  part: string,
  state: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/field/${part}/${state}`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};