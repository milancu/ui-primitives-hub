import { useQueryState } from "nuqs";

export const useCurrentPartParam = () => {
  return useQueryState("part",{
    history: 'push',
  });
};
