"use client";

import * as React from "react";

import { NavMain } from "@/features/sidebar/components/nav-main.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator";
import ComponentLayers from "@/features/component-layers/components/component-layers.tsx";

const data = {
  navMain: [
    {
      title: "Accordion",
      url: "accordion",
    },
    {
      title: "Avatar",
      url: "avatar",
    },
    {
      title: "Dialog",
      url: "dialog"
    },
    {
      title: "Field",
      url: `field`
    },
    {
      title: "Fieldset",
      url: "fieldset"
    },
    {
      title: "Menu",
      url: "menu"
    },
    {
      title: "Number field",
      url: "number-field"
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] mt-auto !h-[calc(100svh-var(--header-height))] border-r-0"
      {...props}
      variant={"inset"}
    >
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {/*<NavSecondary className={"mt-auto"} />*/}
      </SidebarContent>
      <SidebarFooter>
        <ComponentLayers />
        {/*<SidebarMenu>*/}
        {/*  <SidebarMenuItem>*/}
        {/*    <NavUser />*/}
        {/*  </SidebarMenuItem>*/}
        {/*</SidebarMenu>*/}
      </SidebarFooter>
    </Sidebar>
  );
}
