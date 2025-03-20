import { useQuery } from "@tanstack/react-query";
import { fetchAccordionStyles } from "@/features/accordion/api/queries";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";

type UseAccordionStylesParams = {
  onDataLoaded?: (component: Component) => void;
  projectId: string;
};

export const useAccordionStyles = ({
  onDataLoaded,
  projectId,
}: UseAccordionStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["accordion"],
    queryFn: () => fetchAccordionStyles(projectId),
    refetchOnMount: true,
  });

  useLayoutEffect(() => {
    if (!onDataLoaded) return;
    if (query.data) {
      onDataLoaded(query.data);
    }
  }, [query.data]);

  return query;
};
