import { useQueryState } from "nuqs";

export const useCurrentComponentStateParam = () => {
  return useQueryState("state", {
    defaultValue: "default",
  });
};
