import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAccordionPartStates } from "@/features/accordion/api/queries";
import { Component } from "@ui-primitives-hub/types";

export const useAccordionPartStates = (
  projectId: string,
  part: string | null,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-accordion-${part}-states`],
    queryFn: () => {
      if (!part) throw new Error("Missing part");
      return fetchAccordionPartStates(projectId, part);
    },
    enabled: !!part,
    refetchOnMount: true,
    ...options,
  });
};
