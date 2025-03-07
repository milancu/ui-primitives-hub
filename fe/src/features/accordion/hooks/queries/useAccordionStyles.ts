import { useQuery } from "@tanstack/react-query";
import { fetchAccordionStyles } from "@/features/accordion/api/queries";

export const useAccordionStyles = () => {
  return useQuery({
    queryKey: ["accordion"],
    queryFn: fetchAccordionStyles,
  });
};
