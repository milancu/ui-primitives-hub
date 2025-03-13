import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: _authenticatedIndex,
});

function _authenticatedIndex() {
  return (
    <div className={"flex h-full items-center justify-center"}>Select the component from the sidebar</div>
  );
}
