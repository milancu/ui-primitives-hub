import { authFetch } from "@/lib/authFetch.ts";

export const fetchAccordionHierarchy = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/accordion/hierarchy`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAccordionParts = async (projectId: string) => {
  const res = await authFetch(
    `/projects/${projectId}/components/accordion/parts`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAccordionPartStates = async (
  projectId: string,
  part: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/accordion/${part}/states`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};

export const fetchAccordionPartState = async (
  projectId: string,
  part: string,
  state: string,
) => {
  const res = await authFetch(
    `/projects/${projectId}/components/accordion/${part}/${state}`,
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }
  return res.json();
};