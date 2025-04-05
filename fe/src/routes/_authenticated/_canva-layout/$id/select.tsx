import { createFileRoute } from "@tanstack/react-router";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import SelectPage from "@/features/select/pages/SelectPage.tsx";

export const Route = createFileRoute(
  "/_authenticated/_canva-layout/$id/select",
)({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "select", "parts"],
      queryFn: () => fetchParts(params.id, "select"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "select",
    });
    useComponentStore.setState({
      parts: parts,
    });
    return { id: params.id };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
  component: RouteComponent,
});

function RouteComponent() {
  return <SelectPage />;
}
