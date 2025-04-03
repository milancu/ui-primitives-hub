import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Plus } from "lucide-react";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { ColorSelect } from "@/components/ui/color-select.tsx";
import { useStyleStore } from "@/hooks/store/style-store.ts";

const NavBackgroundEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);

  return (
    <Collapsible title={"Background properties"} className="group/collapsible">
      <SidebarGroup className={"p-0"}>
        <SidebarGroupLabel asChild className="group/label">
          <CollapsibleTrigger>
            Background properties
            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className={"flex gap-1"}>
                <ColorSelect
                  placeholder={"Background color"}
                  value={style?.background}
                  handleChange={(newValue) =>
                    handleStyle("background", newValue)
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  character={"O"}
                  placeholder={"opacity"}
                  type={"number"}
                  min={0}
                  max={100}
                  step={5}
                  value={style?.opacity}
                  handleChange={(newValue) => handleStyle("opacity", newValue)}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavBackgroundEditor;
