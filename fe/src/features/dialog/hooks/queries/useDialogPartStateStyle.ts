import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchDialogPartState } from "@/features/dialog/api/queries";

export const useDialogPartStateStyle = (
  projectId: string,
  part: string | null,
  state: string | null,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [`${projectId}-dialog-${part}-${state}`],
    queryFn: () => {
      if (!part || !state) throw new Error("Missing part or state");
      return fetchDialogPartState(projectId, part, state);
    },
    enabled: !!(part && state),
    refetchOnMount: true,
    ...options,
  });
};
