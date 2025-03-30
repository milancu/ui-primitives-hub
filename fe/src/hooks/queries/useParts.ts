import { useQuery } from "@tanstack/react-query";
import { Component } from "../../../../packages/types";
import { fetchParts } from "@/api/queries";

export const useParts = (projectId: string, component: string) => {
  return useQuery<Component>({
    queryKey: [
      `${projectId}-${component}`,
      `${projectId}-${component}-parts`,
    ],
    queryFn: () => fetchParts(projectId, component),
    refetchOnMount: true,
  });
};
