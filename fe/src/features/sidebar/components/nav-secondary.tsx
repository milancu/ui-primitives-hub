import React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar.tsx";
import FigmaLayers from "@/features/component-layers/components/component-layers.tsx";

export function NavSecondary({
  ...props
}: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <FigmaLayers />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
