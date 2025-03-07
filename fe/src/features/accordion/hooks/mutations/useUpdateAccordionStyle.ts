import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccordionStyle } from "@/features/accordion/api/mutations";

export const useUpdateAccordionStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccordionStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accordion"] });
    },
  });
};
