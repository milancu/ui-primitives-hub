"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useCurrenStateParam } from "@/features/sidebar/hooks/useCurrenStateParam.tsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
  }[];
}) {
  const [, setState] = useCurrenStateParam();
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
                // setState(null);
              }}
              params={{
                id: id!,
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
