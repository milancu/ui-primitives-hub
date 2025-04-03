import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColors } from "@/features/color-customizer/api/mutations";

export const useUpdateProjectColors = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateColors,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.id, "colors"],
      });
    },
  });
};
