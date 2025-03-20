import { useQuery } from "@tanstack/react-query";
import { fetchProject } from "@/features/dashboard/api/queries";

export const useGetProject = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["project"],
    queryFn: () => fetchProject(id),
  });
};
