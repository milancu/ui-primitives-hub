import { useQueryState } from "nuqs";

export const useCurrentComponentFilter = () => {
  return useQueryState("component", {defaultValue:""});
};
