import { useQuery } from "@tanstack/react-query";
import { fetchAvatarHierarchy } from "@/features/avatar/api/queries";
import { ComponentHierarchy } from "@ui-primitives-hub/types";

export const useAvatarHierarchy = (projectId: string) => {
  return useQuery<ComponentHierarchy>({
    queryKey: [`${projectId}-avatar-hierarchy`],
    queryFn: () => fetchAvatarHierarchy(projectId),
    refetchOnMount: true,
  });
};
