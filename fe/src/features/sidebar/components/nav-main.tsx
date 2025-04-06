"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useCurrentStateParam } from "@/hooks/use-current-state-param.tsx";
import { AppRoute } from "@/features/sidebar/components/sidebar-left.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: AppRoute;
  }[];
}) {
  const [, setState] = useCurrentStateParam();
  const { id } = useParams({ strict: false });
  const { pathname } = useLocation();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            isActive={pathname === `/${id}/${item.url}`}
          >
            <Link
              to={`/$id/${item.url}`}
              params={{
                id: id!,
              }}
              onClick={() => {
                setState(null);
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
