import { createFileRoute } from "@tanstack/react-router";
import DialogPage from "@/features/dialog/pages/DialogPage.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout/dialog")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DialogPage />;
}
