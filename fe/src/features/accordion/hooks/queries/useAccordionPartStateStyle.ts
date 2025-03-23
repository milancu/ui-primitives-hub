import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAccordionPartState } from "@/features/accordion/api/queries";

export const useAccordionPartStateStyle = (
  projectId: string,
  part: string | null,
  state: string | null,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [`${projectId}-accordion-${part}-${state}`],
    queryFn: () => {
      if (!part || !state) throw new Error("Missing part or state");
      return fetchAccordionPartState(projectId, part, state);
    },
    enabled: !!(part && state),
    refetchOnMount: true,
    ...options,
  });
};
