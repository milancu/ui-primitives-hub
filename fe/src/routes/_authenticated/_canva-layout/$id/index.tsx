import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      Select component from the sidebar to edit.
    </div>
  );
}
