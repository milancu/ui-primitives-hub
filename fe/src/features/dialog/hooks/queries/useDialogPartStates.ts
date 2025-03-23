import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Component } from "@ui-primitives-hub/types";
import { fetchDialogPartStates } from "@/features/dialog/api/queries";

export const useDialogPartStates = (
  projectId: string,
  part: string | null,
  options?: UseQueryOptions<Component>,
) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-dialog-${part}-states`],
    queryFn: () => {
      if (!part) throw new Error("Missing part");
      return fetchDialogPartStates(projectId, part);
    },
    enabled: !!part,
    refetchOnMount: true,
    ...options,
  });
};
