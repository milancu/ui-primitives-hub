import { useQuery } from "@tanstack/react-query";
import { Component } from "@ui-primitives-hub/types";
import { fetchAvatarParts } from "@/features/avatar/api/queries";

export const useAvatarParts = (projectId: string) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-avatar`, `${projectId}-avatar-parts`],
    queryFn: () => fetchAvatarParts(projectId),
    refetchOnMount: true,
  });
};
