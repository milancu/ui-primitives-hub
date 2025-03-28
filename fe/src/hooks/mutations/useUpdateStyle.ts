import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStyle } from "@/api/mutations";

export const useUpdateStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStyle,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.componentName] });
    },
  });
};