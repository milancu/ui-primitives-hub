import { createFileRoute } from "@tanstack/react-router";
import ColorCustomizerPage from "@/features/color-customizer/pages/color-customizer-page.tsx";

export const Route = createFileRoute(
  "/_authenticated/_canva-layout/$id/color-customizer",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ColorCustomizerPage />;
}
