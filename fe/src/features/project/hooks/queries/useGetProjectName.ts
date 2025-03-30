import { useQuery } from "@tanstack/react-query";
import { fetchProjectName } from "@/features/project/api/queries";

export const useGetProjectName = (id?: string | null) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProjectName(id!),
    enabled: !!id,
  });
};
