import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { Component } from "@ui-primitives-hub/types";
import { fetchAvatarStyles } from "@/features/avatar/api/queries";

type UseAvatarStylesParams = {
  onDataLoaded?: (component: Component) => void;
};

export const useAvatarStyles = ({ onDataLoaded }: UseAvatarStylesParams) => {
  const query = useQuery<Component>({
    queryKey: ["avatar"],
    queryFn: fetchAvatarStyles,
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
