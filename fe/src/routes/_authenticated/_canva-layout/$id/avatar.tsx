import { createFileRoute } from "@tanstack/react-router";
import AvatarPage from "@/features/avatar/pages/AvatarPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/avatar")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AvatarPage />;
}
