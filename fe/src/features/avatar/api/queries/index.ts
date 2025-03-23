import { authFetch } from "@/lib/authFetch.ts";

export const fetchAvatarHierarchy = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/avatar/hierarchy`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAvatarParts = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/avatar/parts`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAvatarPartStates = async (
  projectId: string,
  part: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/avatar/${part}/states`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAvatarPartState = async (
  projectId: string,
  part: string,
  state: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/avatar/${part}/${state}`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};