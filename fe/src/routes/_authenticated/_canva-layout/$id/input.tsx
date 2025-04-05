import { createFileRoute } from "@tanstack/react-router";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import InputPage from "@/features/input/pages/InputPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/input")(
  {
    loader: async ({ params, context: { queryClient } }) => {
      const parts = await queryClient.ensureQueryData({
        queryKey: ["projects", params.id, "components", "input", "parts"],
        queryFn: () => fetchParts(params.id, "input"),
      });
      useProjectStore.setState({
        projectId: params.id,
      });
      useComponentStore.setState({
        componentName: "input",
      });
      useComponentStore.setState({
        parts: parts,
      });
      return { id: params.id };
    },
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: () => <div>Error!</div>,
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <InputPage />;
}
