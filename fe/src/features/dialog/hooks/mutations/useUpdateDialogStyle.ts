import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDialogStyle } from "@/features/dialog/api/mutations";

export const useUpdateDialogStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDialogStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dialog"] });
    },
  });
};
