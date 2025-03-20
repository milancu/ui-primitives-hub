import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/features/dashboard/api/queries";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};
