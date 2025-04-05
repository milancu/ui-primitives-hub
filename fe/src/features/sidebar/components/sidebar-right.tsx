import * as React from "react";
import { useCallback } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import NavEditor from "@/features/sidebar/components/nav-editor/nav-editor.tsx";
import NavEditorHeader from "@/features/sidebar/components/nav-editor/nav-editor-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useResetStyle } from "@/hooks/mutations/useResetStyle.ts";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { useCurrenStateParam } from "@/hooks/useCurrenStateParam.tsx";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { useStyleStore } from "@/hooks/store/style-store";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { mutateAsync, isPending } = useResetStyle();
  const [currentPart] = useCurrentPartParam();
  const [state] = useCurrenStateParam();
  const projectId = useProjectStore((state) => state.projectId);
  const componentName = useComponentStore((state) => state.componentName);
  const initializeStyle = useStyleStore((state) => state.initializeStyle);
  const setStyle = useStyleStore((state) => state.setStyle);

  const handleResetStyle = useCallback(() => {
    if (!currentPart || !componentName || !projectId) return;
    mutateAsync({
      componentName: componentName,
      part: currentPart,
      projectId: projectId,
      state: state,
    }).then((res) => {
      initializeStyle(res[state])
      // setStyle({});
    });
  }, [mutateAsync, currentPart, projectId, state, componentName]);

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
      <SidebarFooter>
        <Button
          variant={"outline"}
          onClick={handleResetStyle}
          disabled={isPending}
        >
          Reset style
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
