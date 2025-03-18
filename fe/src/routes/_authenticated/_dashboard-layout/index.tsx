import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "@/features/dashboard/pages/dashboard-page.tsx";

export const Route = createFileRoute("/_authenticated/_dashboard-layout/")({
  component: _authenticatedIndex,
});

function _authenticatedIndex() {
  return <DashboardPage />;
}
