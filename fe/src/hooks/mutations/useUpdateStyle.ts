import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStyle } from "@/api/mutations";

export const useUpdateStyle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStyle,
    onSuccess: (_, variables) => {
      console.log(variables);
      queryClient.invalidateQueries({ queryKey: [`${variables.projectId}-${variables.componentName}`] });
    },
  });
};