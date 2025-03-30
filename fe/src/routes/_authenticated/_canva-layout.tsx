import {
  createFileRoute,
  Outlet,
  useLocation,
  useParams,
} from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import { SidebarLeft } from "@/features/sidebar/components/sidebar-left.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { SidebarRight } from "@/features/sidebar/components/sidebar-right.tsx";
import Header from "@/features/header/components/header.tsx";
import { useProjectTabs } from "@/hooks/use-project-tabs.ts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { componentStore } from "@/store/component.store.ts";
import { projectStore } from "@/store/project.store.ts";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPart, setCurrentPart] = useCurrentPartParam();
  const [mainSection, setMainSection] = useState<string>("Home");
  const { setHierarchy } = useHierarchy();
  const { setStyle } = useStyle();

  const { id } = useParams({
    strict: false,
  });

  const location = useLocation();
  useProjectTabs();

  const formatSegment = (segment: string) => {
    return segment
      .replace(/[-_]/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
  };

  useEffect(() => {
    const pathSegments = location.pathname
      .split("/")
      .filter(Boolean)
      .map(formatSegment);
    setMainSection(pathSegments[1] || "Home");
  }, [location.pathname]);

  useLayoutEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments[1] === "color-customizer") {
      setCurrentPart("");
    }
    componentStore.setState(() => null);
    projectStore.setState(() => null);
    setHierarchy(undefined);
    setStyle(undefined);
  }, [id, setHierarchy, setStyle, location.pathname, setCurrentPart]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarLeft />
          <SidebarInset className="h-[calc(100vh-1rem-var(--header-height))] overflow-hidden rounded-lg shadow-2xl">
            <Tabs className={"h-full w-full"} defaultValue={"preview"}>
              <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-3">
                <div className="flex flex-1 items-center gap-2">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="line-clamp-1">
                          {mainSection}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                      {currentPart && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                              {formatSegment(currentPart)}
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </>
                      )}
                    </BreadcrumbList>
                  </Breadcrumb>
                  <TabsList className={"ml-auto"}>
                    <TabsTrigger value={"preview"}>Preview</TabsTrigger>
                    <TabsTrigger value={"code"}>Code</TabsTrigger>
                  </TabsList>
                </div>
              </header>
              <div className={"h-full overflow-auto"}>
                <Outlet />
              </div>
            </Tabs>
          </SidebarInset>
          {currentPart !== "" && <SidebarRight />}
        </div>
      </SidebarProvider>
    </div>
  );
}
