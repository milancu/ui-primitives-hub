import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchNumberFieldStyles } from "@/features/number-field/api/queries";

type UseDialogStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useNumberFieldStyles = ({
  onDataLoaded,
}: UseDialogStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["number-field"],
    queryFn: fetchNumberFieldStyles,
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
