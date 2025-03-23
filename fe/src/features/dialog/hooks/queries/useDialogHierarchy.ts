import { useQuery } from "@tanstack/react-query";
import { ComponentHierarchy } from "@ui-primitives-hub/types";
import { fetchDialogHierarchy } from "@/features/dialog/api/queries";

export const useDialogHierarchy = (projectId: string) => {
  return useQuery<ComponentHierarchy>({
    queryKey: [`${projectId}-dialog-hierarchy`],
    queryFn: () => fetchDialogHierarchy(projectId),
    refetchOnMount: true,
  });
};
