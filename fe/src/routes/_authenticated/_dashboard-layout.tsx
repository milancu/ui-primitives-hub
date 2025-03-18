import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"bg-red-500"}>
      <Outlet />
    </div>
  );
}
