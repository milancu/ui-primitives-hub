import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchMenuStyles } from "@/features/menu/api/queries";

type UseDialogStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useMenuStyles = ({ onDataLoaded }: UseDialogStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["menu"],
    queryFn: fetchMenuStyles,
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
