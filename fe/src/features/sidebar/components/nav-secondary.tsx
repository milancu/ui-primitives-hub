"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useStyle } from "@/components/style-provider.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";

export function NavSecondary() {
  const { setStyle } = useStyle();
  const [, setState] = useCurrentComponentStateParam();
  const { pathname } = useLocation();
  const { id } = useParams({ strict: false });


  return (
    <SidebarMenu className={'p-2'}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname === `/${id}/color-customizer`}>
          <Link
            to={`${id}/color-customizer`}
            onClick={() => {
              setStyle(undefined);
              setState(null);
            }}
          >
            <span>Color Customizer</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
