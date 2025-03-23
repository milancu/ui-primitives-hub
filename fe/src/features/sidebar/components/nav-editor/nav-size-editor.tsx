import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { Plus } from "lucide-react";
import { useStyle } from "@/components/style-provider.tsx";

const NavSizeEditor = () => {
  const { style: currentStyle, handleStyle } = useStyle();

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
                <InputWithIcon
                  placeholder={"width"}
                  character={"W"}
                  handleChange={(newValue) => handleStyle("width", newValue)}
                  value={currentStyle?.width}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"min-width"}
                  character={"W"}
                  handleChange={(newValue) => handleStyle("minWidth", newValue)}
                  value={currentStyle?.minWidth}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"max-width"}
                  character={"W"}
                  handleChange={(newValue) => handleStyle("maxWidth", newValue)}
                  value={currentStyle?.maxWidth}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"height"}
                  character={"H"}
                  handleChange={(newValue) => handleStyle("height", newValue)}
                  value={currentStyle?.height}
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
