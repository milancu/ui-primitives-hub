import { createFileRoute } from "@tanstack/react-router";
import FieldPage from "@/features/field/pages/FieldPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/field")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FieldPage />;
}
