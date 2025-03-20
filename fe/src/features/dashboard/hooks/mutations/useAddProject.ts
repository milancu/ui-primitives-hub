import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "@/features/dashboard/api/mutations";

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
