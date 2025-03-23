import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import NavEditor from "@/features/sidebar/components/nav-editor/nav-editor.tsx";
import NavEditorHeader from "@/features/sidebar/components/nav-editor/nav-editor-header.tsx";
import CodePreviewSheet from "@/features/code-preview/components/code-preivew-sheet.tsx";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant={"floating"}
      // collapsible="none"
      className="sticky hidden lg:flex top-[--header-height] mt-auto !h-[calc(100svh-var(--header-height)-8px)]"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border flex h-14 items-center justify-center border-b">
        <NavEditorHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavEditor />
      </SidebarContent>
      <SidebarFooter>
        <CodePreviewSheet />
      </SidebarFooter>
    </Sidebar>
  );
}
