import { useQuery } from "@tanstack/react-query";
import { searchProjects } from "@/features/command-menu/api/queries";

export const useSearchProjects = (searchTerm: string) => {
  return useQuery({
    queryKey: ["projects", "searchTerm", searchTerm],
    queryFn: () => searchProjects(searchTerm),
    enabled: searchTerm.length > 0,
  });
};
