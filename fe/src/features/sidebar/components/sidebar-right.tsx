import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import NavEditor from "@/features/sidebar/components/nav-editor/nav-editor.tsx";
import NavEditorHeader from "@/features/sidebar/components/nav-editor/nav-editor-header.tsx";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-14 border-b flex items-center justify-center">
        <NavEditorHeader/>
      </SidebarHeader>
      <SidebarContent>
        <NavEditor />
      </SidebarContent>
    </Sidebar>
  );
}
