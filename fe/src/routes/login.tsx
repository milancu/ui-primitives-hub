import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "@/features/auth/components/AuthProvider.tsx";
import LoginPage from "@/features/auth/pages/login-page.tsx";

const fallback = "/accordion" as const;

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: ({
    context,
    search,
  }: {
    context: { auth: AuthContextType };
    search: { redirect?: string };
  }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});

function RouteComponent() {
  return (
    <LoginPage />
  );
}
