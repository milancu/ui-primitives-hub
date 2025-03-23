import { useQuery } from "@tanstack/react-query";
import { Component } from "../../../../packages/types";
import { fetchParts } from "@/api/queries";

export const useParts = (projectId: string, projectName: string) => {
  return useQuery<Component>({
    queryKey: [
      `${projectId}-${projectName}`,
      `${projectId}-${projectName}-parts`,
    ],
    queryFn: () => fetchParts(projectId, projectName),
    refetchOnMount: true,
  });
};
