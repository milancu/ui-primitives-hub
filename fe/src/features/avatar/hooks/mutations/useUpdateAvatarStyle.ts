import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarStyle } from "@/features/avatar/api/mutations";

export const useUpdateAvatarStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatarStyle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["avatar"] });
    },
  });
};
