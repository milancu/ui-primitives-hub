import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/features/header/components/header.tsx";
import { useCurrentPartParam } from "@/hooks/use-current-part-param.tsx";
import { useCurrentStateParam } from "@/hooks/use-current-state-param.tsx";
import { useEffect } from "react";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { useProjectStore } from "@/hooks/store/project-store.ts";

export const Route = createFileRoute("/_authenticated/_dashboard-layout")({
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
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
