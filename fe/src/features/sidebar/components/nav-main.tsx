"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useRouter } from "@tanstack/react-router";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  const { setComponent } = useCurrentComponent();
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <Link
              to={item.url}
              onClick={() => {
                setComponent(undefined);
              }}
            >
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
