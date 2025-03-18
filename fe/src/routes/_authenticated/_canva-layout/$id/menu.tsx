import MenuPage from "@/features/menu/pages/MenuPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/menu")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MenuPage />;
}
