import { useQuery } from "@tanstack/react-query";
import { fetchParts } from "@/api/queries";
import { Component } from "@ui-primitives-hub/types";

export const useParts = (projectId: string, component: string) => {
  return useQuery<Component>({
    queryKey: ["projects", projectId, "components", component, "parts"],
    queryFn: () => fetchParts(projectId, component),
    refetchOnMount: true,
  });
};
