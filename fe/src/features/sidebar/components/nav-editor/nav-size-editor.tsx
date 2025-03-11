import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

const NavSizeEditor = () => {
  const { currentStyle } = useCurrentComponent();

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
              value={currentStyle?.width}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"min-width"}
              character={"W"}
              type={"number"}
              min={0}
              value={currentStyle?.minWidth}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"max-width"}
              character={"W"}
              type={"number"}
              min={0}
              value={currentStyle?.maxWidth}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              placeholder={"height"}
              character={"H"}
              type={"number"}
              min={0}
              value={currentStyle?.height}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavSizeEditor;
