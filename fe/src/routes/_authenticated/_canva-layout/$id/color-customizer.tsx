import { createFileRoute } from "@tanstack/react-router";
import ColorCustomizerPage from "@/features/color-customizer/pages/color-customizer-page.tsx";
import { fetchProjectColors } from "@/features/color-customizer/api/queries";

export const Route = createFileRoute(
  "/_authenticated/_canva-layout/$id/color-customizer",
)({
  loader: async ({ params, context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      queryKey: [params.id],
      queryFn: () => fetchProjectColors(params.id),
    });
    return { id: params.id };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useLoaderData();

  return <ColorCustomizerPage projectId={id} />;
}
