import { useCurrentPartParam } from "@/hooks/use-current-part-param.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { useCurrentStateParam } from "@/hooks/use-current-state-param.tsx";
import { useEffect } from "react";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { useProjectStore } from "@/hooks/store/project-store.ts";

export const Route = createFileRoute("/_authenticated/_canva-layout/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [, setCurrentPart] = useCurrentPartParam();
  const [, setCurrentState] = useCurrentStateParam();

  useEffect(() => {
    setCurrentPart(null);
    setCurrentState(null);
    useComponentStore.setState({
      componentName: undefined,
    });
    useProjectStore.setState({
      projectId: undefined,
    });
  }, [setCurrentPart, setCurrentState]);

  return (
    <div className={"flex h-full w-full items-center justify-center"}>
      Select component from the sidebar to edit.
    </div>
  );
}
