import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchPartStateStyle } from "@/api/queries";

export const usePartStateStyle = (
  projectId: string,
  part: string | null,
  state: string | null,
  componentName: string,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [`${projectId}-${componentName}`],
    queryFn: () => {
      if (!part || !state) throw new Error("Missing part or state");
      return fetchPartStateStyle(projectId, part, state, componentName);
    },
    enabled: !!(part && state),
    refetchOnMount: true,
    ...options,
  });
};
