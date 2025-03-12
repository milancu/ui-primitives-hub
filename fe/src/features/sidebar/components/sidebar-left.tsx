"use client";

import * as React from "react";

import { NavMain } from "@/features/sidebar/components/nav-main.tsx";
import { NavSecondary } from "@/features/sidebar/components/nav-secondary.tsx";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar.tsx";
import { NavUser } from "@/features/sidebar/components/nav-user.tsx";
import { Separator } from "@/components/ui/separator";

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
      url: "/fiel",
    },
    {
      title: "Fieldset",
      url: "/fieldset",
    },
    {
      title: "Input",
      url: "/input"
    },
    {
      title: "Menu",
      url: "/menu"
    },
    {
      title: "Number field",
      url: "/number-field"
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <img src={'./ui-primitives-hub-logo.png'} alt={'logo'} className={'w-[90%] mx-auto'} />
        </SidebarMenu>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavSecondary className={"mt-auto"} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
