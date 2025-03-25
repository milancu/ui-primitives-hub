import { useQuery } from "@tanstack/react-query";
import { fetchProjectColors } from "@/features/color-customizer/api/queries";

export const useGetProjectColors = (id: string) => {
  return useQuery({
    queryKey: [`project-${id}-colors`],
    queryFn: () => fetchProjectColors(id),
  });
};
