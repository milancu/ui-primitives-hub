import { createFileRoute } from "@tanstack/react-router";
import SuccessPage from "@/features/success/pages/succcess-page.tsx";

export const Route = createFileRoute("/_authenticated/success")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SuccessPage />;
}
