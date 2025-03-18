import { createFileRoute } from "@tanstack/react-router";
import FieldsetPage from "@/features/fieldset/pages/FieldsetPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/fieldset")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FieldsetPage />;
}
