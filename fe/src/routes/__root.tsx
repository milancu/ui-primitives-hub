import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "@/components/AuthProvider.tsx";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
