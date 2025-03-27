"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useStyle } from "@/components/style-provider.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  const { setStyle } = useStyle();
  const { setHierarchy } = useHierarchy();
  const [, setState] = useCurrentComponentStateParam();
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
              onClick={() => {
                setStyle(undefined);
                setState(null);
                setHierarchy(undefined);
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
