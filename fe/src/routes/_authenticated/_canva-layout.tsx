import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { useProjectTabs } from "@/hooks/use-project-tabs.ts";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import Header from "@/features/header/components/header.tsx";
import { SidebarLeft } from "@/features/sidebar/components/sidebar-left.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import AppBreadcrumb from "@/features/breadcrumb/components/app-breadcrumb.tsx";
import { SidebarRight } from "@/features/sidebar/components/sidebar-right.tsx";

export const Route = createFileRoute("/_authenticated/_canva-layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentPart] = useCurrentPartParam();
  useProjectTabs();

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarLeft />
          <SidebarInset className="h-[calc(100vh-1rem-var(--header-height))] overflow-hidden rounded-lg shadow-2xl">
            <Tabs className={"h-full w-full"} defaultValue={"preview"}>
              <div className="bg-background sticky top-0 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-3">
                <div className="flex flex-1 items-center gap-2">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <AppBreadcrumb />
                  <TabsList className={"ml-auto"}>
                    <TabsTrigger value={"preview"}>Preview</TabsTrigger>
                    <TabsTrigger value={"code"}>Code</TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <div className={"h-full overflow-auto"}>
                <Outlet />
              </div>
            </Tabs>
          </SidebarInset>
          {currentPart && <SidebarRight />}
        </div>
      </SidebarProvider>
    </div>
  );
}
