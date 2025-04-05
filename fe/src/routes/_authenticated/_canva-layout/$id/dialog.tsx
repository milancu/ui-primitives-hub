import { createFileRoute } from "@tanstack/react-router";
import DialogPage from "@/features/dialog/pages/DialogPage.tsx";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/dialog")({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "dialog", "parts"],
      queryFn: () => fetchParts(params.id, "dialog"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "dialog",
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
  return <DialogPage />;
}
