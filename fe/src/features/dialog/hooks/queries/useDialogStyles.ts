import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchDialogStyles } from "@/features/dialog/api/queries";

type UseDialogStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useDialogStyles = ({ onDataLoaded }: UseDialogStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["dialog"],
    queryFn: fetchDialogStyles,
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
