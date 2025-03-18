import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { CommandMenu } from "@/features/command-menu/components/command-menu.tsx";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function AuthenticatedLayout() {
  return (
    <>
      <Outlet />
      <CommandMenu />
    </>
  );
}
