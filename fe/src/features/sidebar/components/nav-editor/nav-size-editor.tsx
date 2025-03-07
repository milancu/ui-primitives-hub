import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";

const NavSizeEditor = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Size properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"width"}
              character={"W"}
              type={"number"}
              min={0}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"min-width"}
              character={"W"}
              type={"number"}
              min={0}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"max-width"}
              character={"W"}
              type={"number"}
              min={0}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"height"}
              character={"H"}
              type={"number"}
              min={0}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavSizeEditor;
