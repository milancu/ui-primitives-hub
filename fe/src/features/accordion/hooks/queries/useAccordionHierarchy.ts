import { useQuery } from "@tanstack/react-query";
import { fetchAccordionHierarchy } from "@/features/accordion/api/queries";
import { ComponentHierarchy } from "@ui-primitives-hub/types";

export const useAccordionHierarchy = (projectId: string) => {
  return useQuery<ComponentHierarchy>({
    queryKey: [`${projectId}-accordion-hierarchy`],
    queryFn: () => fetchAccordionHierarchy(projectId),
    refetchOnMount: true,
  });
};
