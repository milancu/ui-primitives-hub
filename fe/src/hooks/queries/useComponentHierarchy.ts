import { useQuery } from "@tanstack/react-query";
import { fetchHierarchy } from "@/api/queries";
import { ComponentHierarchy } from "@ui-primitives-hub/types";

export const useComponentHierarchy = (projectId?: string, componentName?: string) => {
  return useQuery<ComponentHierarchy>({
    queryKey: ['components', componentName, 'hierarchy'],
    queryFn: () => fetchHierarchy(projectId!, componentName!),
    enabled: !!projectId && !!componentName,
  });
};