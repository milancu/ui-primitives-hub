import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarLeft } from "@/features/sidebar/components/sidebar-left.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";

export const Route = createFileRoute("/_sidebarLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <Outlet />
    </SidebarProvider>
  );
}
