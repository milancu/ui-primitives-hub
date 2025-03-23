import { useQuery } from "@tanstack/react-query";
import { Component } from "@ui-primitives-hub/types";
import { fetchDialogParts } from "@/features/dialog/api/queries";

export const useDialogParts = (projectId: string) => {
  return useQuery<Component>({
    queryKey: [`${projectId}-avatar`, `${projectId}-dialog-parts`],
    queryFn: () => fetchDialogParts(projectId),
    refetchOnMount: true,
  });
};
