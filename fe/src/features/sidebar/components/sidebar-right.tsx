import * as React from "react";
import { Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import NavSizeEditor from "@/features/sidebar/components/nav-editor/nav-size-editor.tsx";
import NavLayoutEditor from "@/features/sidebar/components/nav-editor/nav-layout-editor.tsx";
import NavBorderOutlineEditor from "@/features/sidebar/components/nav-editor/nav-border-outline-editor.tsx";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-14 border-b"></SidebarHeader>
      <SidebarContent>
        <NavSizeEditor />
        <NavLayoutEditor />
        <NavBorderOutlineEditor />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
