import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetStyle } from "@/api/mutations";

export const useResetStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetStyle,
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: [
          "projects",
          variables.projectId,
          "components",
          variables.componentName,
          "parts",
        ],
      });
    },
  });
};
