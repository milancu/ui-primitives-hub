import { useQueryState } from "nuqs";

export const useCurrentStateParam = () => {
  return useQueryState("state", {
    defaultValue: "default",
    history: 'push',
  });
};
