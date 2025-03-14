import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchFieldStyles } from "@/features/field/api/queries";

type UseDialogStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useFieldStyles = ({ onDataLoaded }: UseDialogStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["field"],
    queryFn: fetchFieldStyles,
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
