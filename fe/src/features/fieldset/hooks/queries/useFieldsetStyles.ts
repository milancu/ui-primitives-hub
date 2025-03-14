import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchFieldsetStyles } from "@/features/fieldset/api/queries";

type UseDialogStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useFieldsetStyles = ({ onDataLoaded }: UseDialogStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["fieldset"],
    queryFn: fetchFieldsetStyles,
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
