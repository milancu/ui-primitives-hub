import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStyle } from "@/api/mutations";

export const useUpdateStyle = (component: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [component] });
    },
  });
};
