import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Component } from "../../../../packages/types";
import { fetchPartStates } from "@/api/queries";

export const usePartStates = (
  projectId: string,
  part: string | null,
  projectName: string,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-${projectName}-${part}-states`],
    queryFn: () => {
      if (!part) throw new Error("Missing part");
      return fetchPartStates(projectId, part, projectName);
    },
    enabled: !!part,
    refetchOnMount: true,
    ...options,
  });
};
