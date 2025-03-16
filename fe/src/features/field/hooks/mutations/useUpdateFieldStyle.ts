import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFieldStyle } from "@/features/field/api/mutations";

export const useUpdateFieldStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFieldStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["field"] });
    },
  });
};
