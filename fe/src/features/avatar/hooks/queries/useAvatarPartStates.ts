import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Component } from "@ui-primitives-hub/types";
import { fetchAvatarPartStates } from "@/features/avatar/api/queries";

export const useAvatarPartStates = (
  projectId: string,
  part: string | null,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-avatar-${part}-states`],
    queryFn: () => {
      if (!part) throw new Error("Missing part");
      return fetchAvatarPartStates(projectId, part);
    },
    enabled: !!part,
    refetchOnMount: true,
    ...options,
  });
};
