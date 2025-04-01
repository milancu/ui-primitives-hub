import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchPartStates } from "@/api/queries";
import { Component } from "@ui-primitives-hub/types";

export const usePartStates = (
  projectId: string,
  part: string | null,
  componentName: string,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: [`${componentName}-states`],
    queryFn: () => {
      if (!part) throw new Error("Missing part");
      return fetchPartStates(projectId, part, componentName);
    },
    enabled: !!part,
    refetchOnMount: true,
    ...options,
  });
};
