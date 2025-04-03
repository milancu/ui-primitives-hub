import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchPartStates } from "@/api/queries";
import { Component } from "@ui-primitives-hub/types";

export const usePartStates = (
  projectId?: string,
  part?: string | null,
  componentName?: string,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: ["components", componentName, "parts", part, "states"],
    queryFn: () => {
      if (!part || !projectId || !componentName)
        throw new Error("Missing part or projectId");
      return fetchPartStates(projectId, part, componentName);
    },
    enabled: !!part && !!projectId && !!componentName,
    ...options,
  });
};
