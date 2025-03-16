import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenuStyle } from "@/features/menu/api/mutations";

export const useUpdateMenuStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenuStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });
};
