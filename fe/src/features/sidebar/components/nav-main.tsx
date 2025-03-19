"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
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
