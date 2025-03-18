import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/features/header/components/header.tsx";

export const Route = createFileRoute("/_authenticated/_dashboard-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
