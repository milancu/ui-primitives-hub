import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFieldsetStyle } from "@/features/fieldset/api/mutations";

export const useUpdateFieldsetStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFieldsetStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fieldset"] });
    },
  });
};
