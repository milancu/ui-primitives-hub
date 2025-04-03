import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchProjectColors } from "@/features/color-customizer/api/queries";
import { ColorScheme } from "../../../../../../packages/types";

export const useGetProjectColors = (
  id?: string | null,
  options?: UseQueryOptions<{ light: ColorScheme; dark: ColorScheme }, Error>,
) => {
  return useQuery<{ light: ColorScheme; dark: ColorScheme }, Error>({
    queryKey: ["projects", id, "colors"],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("Missing project ID");
      try {
        return await fetchProjectColors(id);
      } catch (error) {
        console.error("Error fetching project colors:", error);
        throw new Error("Failed to fetch project colors");
      }
    },
    ...options,
  });
};
