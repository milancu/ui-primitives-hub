import { useQuery } from "@tanstack/react-query";
import { fetchAccordionStyles } from "@/features/accordion/api/queries";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";

type UseAccordionStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useAccordionStyles = ({
  onDataLoaded,
}: UseAccordionStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["accordion"],
    queryFn: fetchAccordionStyles,
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
