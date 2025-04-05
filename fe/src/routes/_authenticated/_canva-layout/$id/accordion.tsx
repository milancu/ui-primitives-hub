import { createFileRoute } from "@tanstack/react-router";
import AccordionPage from "@/features/accordion/pages/AccordionPage.tsx";
import { fetchParts } from "@/api/queries";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";

export const Route = createFileRoute(
  "/_authenticated/_canva-layout/$id/accordion",
)({
  loader: async ({ params, context: { queryClient } }) => {
    const parts = await queryClient.ensureQueryData({
      queryKey: ["projects", params.id, "components", "accordion", "parts"],
      queryFn: () => fetchParts(params.id, "accordion"),
    });
    useProjectStore.setState({
      projectId: params.id,
    });
    useComponentStore.setState({
      componentName: "accordion",
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
  return <AccordionPage />;
}
