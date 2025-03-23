import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchAvatarPartState } from "@/features/avatar/api/queries";

export const useAvatarPartStateStyle = (
  projectId: string,
  part: string | null,
  state: string | null,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [`${projectId}-avatar-${part}-${state}`],
    queryFn: () => {
      if (!part || !state) throw new Error("Missing part or state");
      return fetchAvatarPartState(projectId, part, state);
    },
    enabled: !!(part && state),
    refetchOnMount: true,
    ...options,
  });
};
