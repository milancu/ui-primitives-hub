import { createFileRoute } from "@tanstack/react-router";
import NumberFieldPage from "@/features/number-field/pages/NumberFieldPage.tsx";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

export const Route = createFileRoute(
  "/_authenticated/_canva-layout/$id/number-field",
)({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "numberfield", "parts"],
      queryFn: () => fetchParts(params.id, "numberfield"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "numberfield",
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
  return <NumberFieldPage />;
}
