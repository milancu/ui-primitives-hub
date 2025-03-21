import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "@/features/project/api/queries";

export const useGetProject = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["project"],
    queryFn: () => fetchProject(id),
  });
};
