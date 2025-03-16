import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNumberFieldStyle } from "@/features/number-field/api/mutations";

export const useUpdateNumberFieldStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNumberFieldStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["number-field"] });
    },
  });
};
