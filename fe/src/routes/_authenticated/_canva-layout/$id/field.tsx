import { createFileRoute } from "@tanstack/react-router";
import FieldPage from "@/features/field/pages/FieldPage.tsx";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/field")({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "field", "parts"],
      queryFn: () => fetchParts(params.id, "field"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "field",
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
  return <FieldPage />;
}
