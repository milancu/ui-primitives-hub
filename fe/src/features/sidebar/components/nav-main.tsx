"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useRouter } from "@tanstack/react-router";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  const { setComponent } = useCurrentComponent();
  const [, setCurrentPart] = useCurrentPartParam();
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
                setCurrentPart(null);
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
