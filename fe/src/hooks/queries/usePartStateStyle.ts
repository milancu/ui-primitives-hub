import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchPartStateStyle } from "@/api/queries";

export const usePartStateStyle = (
  projectId?: string,
  part?: string | null,
  state?: string | null,
  componentName?: string,
  options?: UseQueryOptions<string>,
) => {
  return useQuery<string>({
    queryKey: [
      "projects",
      projectId,
      "components",
      componentName,
      "parts",
      part,
      "states",
      state,
    ],
    queryFn: () => {
      if (!part || !projectId || !componentName || !state)
        throw new Error("Missing part or projectId");
      return fetchPartStateStyle(projectId, part, state, componentName);
    },
    enabled: !!part && !!projectId && !!componentName && !!state,
    ...options,
  });
};
