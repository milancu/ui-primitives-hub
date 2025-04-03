import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchCode } from "@/features/preview/api/queries";

export const useCode = (
  projectId?: string,
  componentName?: string,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: ["projects", projectId, "components", componentName, "code"],
    queryFn: () => {
      if (!projectId || !componentName) throw new Error("Missing project ID");
      return fetchCode(projectId, componentName);
    },
    enabled: !!projectId && !!componentName,
    refetchOnMount: true,
    ...options,
  });
};
