"use client";

import * as React from "react";

import { NavMain } from "@/features/sidebar/components/nav-main.tsx";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar.tsx";
import { NavUser } from "@/features/sidebar/components/nav-user.tsx";
import { Separator } from "@/components/ui/separator";
import { ThemeLogo } from "@/components/ui/theme-logo.tsx";
import FigmaLayers from "@/features/component-layers/components/component-layers.tsx";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Accordion",
      url: "/accordion",
    },
    {
      title: "Avatar",
      url: "/avatar",
    },
    {
      title: "Dialog",
      url: "/dialog",
    },
    {
      title: "Field",
      url: "/field",
    },
    {
      title: "Fieldset",
      url: "/fieldset",
    },
    {
      title: "Menu",
      url: "/menu",
    },
    {
      title: "Number field",
      url: "/number-field",
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props} variant={"inset"}>
      <SidebarHeader>
        <ThemeLogo className={"mb-2 h-14 w-full"} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        {/*<NavSecondary className={"mt-auto"} />*/}
      </SidebarContent>
      <SidebarFooter>
        <FigmaLayers />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
