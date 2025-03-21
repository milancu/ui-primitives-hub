import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/features/project/api/mutations";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
