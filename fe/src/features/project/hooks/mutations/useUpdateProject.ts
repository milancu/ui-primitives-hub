import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/features/project/api/mutations";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
