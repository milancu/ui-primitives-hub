import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { Plus } from "lucide-react";
import { useStyleStore } from "@/hooks/store/style-store.ts";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";

const NavSizeEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);
  return (
    <Collapsible title={"Text properties"} className="group/collapsible">
      <SidebarGroup className={"p-0"}>
        <SidebarGroupLabel asChild className="group/label">
          <CollapsibleTrigger>
            Size properties
            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className={"p-2"}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <InputComponentUnitSwitcher
                  value={style?.width}
                  handleChange={(newValue) => handleStyle("width", newValue)}
                  placeholder={"width"}
                  character={"W"}
                  unit={"px"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputComponentUnitSwitcher
                  value={style?.minWidth}
                  handleChange={(newValue) => handleStyle("minWidth", newValue)}
                  placeholder={"min-width"}
                  character={"W"}
                  unit={"px"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputComponentUnitSwitcher
                  value={style?.maxWidth}
                  handleChange={(newValue) => handleStyle("maxWidth", newValue)}
                  placeholder={"max-width"}
                  character={"W"}
                  unit={"px"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputComponentUnitSwitcher
                  value={style?.height}
                  handleChange={(newValue) => handleStyle("height", newValue)}
                  placeholder={"height"}
                  character={"H"}
                  unit={"px"}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavSizeEditor;
