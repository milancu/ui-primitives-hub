import { useQueryState } from "nuqs";

export const useCurrenStateParam = () => {
  return useQueryState("state", {
    defaultValue: "default",
  });
};
