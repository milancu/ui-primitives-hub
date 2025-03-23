import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchPartStateStyle } from "@/api/queries";

export const usePartStateStyle = (
  projectId: string,
  part: string | null,
  state: string | null,
  projectName: string,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [`${projectId}-${projectName}-${part}-${state}`],
    queryFn: () => {
      if (!part || !state) throw new Error("Missing part or state");
      return fetchPartStateStyle(projectId, part, state, projectName);
    },
    enabled: !!(part && state),
    refetchOnMount: true,
    ...options,
  });
};
