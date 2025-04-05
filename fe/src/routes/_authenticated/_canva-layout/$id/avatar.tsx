import { createFileRoute } from "@tanstack/react-router";
import AvatarPage from "@/features/avatar/pages/AvatarPage.tsx";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/avatar")({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "avatar", "parts"],
      queryFn: () => fetchParts(params.id, "avatar"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "avatar",
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
  return <AvatarPage />;
}
