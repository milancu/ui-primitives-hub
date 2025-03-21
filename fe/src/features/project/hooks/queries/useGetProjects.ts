import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/features/project/api/queries";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};
