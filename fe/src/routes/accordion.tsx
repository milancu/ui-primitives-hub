import { createFileRoute } from "@tanstack/react-router";
import AccordionPage from "@/features/accordion/pages";

export const Route = createFileRoute("/accordion")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AccordionPage />;
}
