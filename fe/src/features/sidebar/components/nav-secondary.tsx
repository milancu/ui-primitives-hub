"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useCurrentStateParam } from "@/hooks/use-current-state-param.tsx";

export function NavSecondary() {
  const [, setState] = useCurrentStateParam();
  const { pathname } = useLocation();
  const { id } = useParams({ strict: false });

  return (
    <SidebarMenu className={"p-2"}>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          isActive={pathname === `/${id}/color-customizer`}
        >
          <Link
            to={`/$id/color-customizer`}
            activeProps={{ className: `font-bold` }}
            onClick={() => {
              setState(null);
            }}
            params={{
              id: id!,
            }}
          >
            <span>Color Customizer</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
