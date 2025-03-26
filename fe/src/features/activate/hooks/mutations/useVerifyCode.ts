import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyCode } from "@/features/activate/api/mutations";

export const useVerifyCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activate"] });
    },
  });
};
