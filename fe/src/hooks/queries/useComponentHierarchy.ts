import { useQuery } from "@tanstack/react-query";
import { ComponentHierarchy } from "../../../../packages/types";
import { fetchHierarchy } from "@/api/queries";

export const useComponentHierarchy = (projectId: string, projectName: string) => {
  return useQuery<ComponentHierarchy>({
    queryKey: [`${projectName}-hierarchy`],
    queryFn: () => fetchHierarchy(projectId, projectName),
    refetchOnMount: true,
  });
};
