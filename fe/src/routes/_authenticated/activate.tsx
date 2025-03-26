import { createFileRoute } from "@tanstack/react-router";
import ActivatePage from "@/features/activate/pages/activate-page.tsx";

export const Route = createFileRoute("/_authenticated/activate")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ActivatePage />;
}
