import { useQuery } from "@tanstack/react-query";
import { fetchAccordionParts } from "@/features/accordion/api/queries";
import { Component } from "@ui-primitives-hub/types";

export const useAccordionParts = (projectId: string) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-accordion`, `${projectId}-accordion-parts`],
    queryFn: () => fetchAccordionParts(projectId),
    refetchOnMount: true,
  });
};
