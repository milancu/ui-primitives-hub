import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/features/sidebar/components/sidebar-left.tsx";
import { SidebarRight } from "@/features/sidebar/components/sidebar-right.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { AuthContextType } from "@/components/AuthProvider.tsx";
import { LogoutButton } from "@/components/ui/logout-button.tsx";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { component } = useCurrentComponent();

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center justify-between gap-2 px-3">
            <SidebarTrigger />
            <ModeToggle />
            {/*<LogoutButton/>*/}
          </div>
        </header>
        <div className={"h-full"}>
          <Outlet />
        </div>
      </SidebarInset>
      {component && <SidebarRight />}
    </SidebarProvider>
  );
}