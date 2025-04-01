import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColors } from "@/features/color-customizer/api/mutations";

export const useUpdateProjectColors = (id: string ) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateColors,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${id}-colors`] });
    },
  });
};
