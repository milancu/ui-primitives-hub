import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "@/features/auth/components/AuthProvider.tsx";
import type { QueryClient } from '@tanstack/react-query'

interface RouterContext {
  auth: AuthContextType;
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return <Outlet />;
}
