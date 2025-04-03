import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStyle } from "@/api/mutations";

export const useUpdateStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStyle,
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: [
          "projects",
          variables.projectId,
          "components",
          variables.componentName,
          "parts",
        ],
        exact: true,
      });
    },
  });
};
