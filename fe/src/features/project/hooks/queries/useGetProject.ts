import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "@/features/project/api/queries";

export const useGetProject = (id?: string | null) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });
};
