import { createFileRoute } from "@tanstack/react-router";
import NumberFieldPage from "@/features/number-field/pages/NumberFieldPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/number-field")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NumberFieldPage />;
}
