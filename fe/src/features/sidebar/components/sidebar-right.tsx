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
      variant={"floating"}
      // collapsible="none"
      className="sticky top-[--header-height] mt-auto hidden !h-[calc(100svh-var(--header-height)-8px)] lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border flex h-14 items-center justify-center border-b">
        <NavEditorHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavEditor />
      </SidebarContent>
    </Sidebar>
  );
}
