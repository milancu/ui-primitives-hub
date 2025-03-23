import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Plus } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { useStyle } from "@/components/style-provider.tsx";

const NavBackgroundEditor = () => {
  const { style: currentStyle, handleStyle } = useStyle();

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
                <ColorPicker
                  hideContrastRatio={true}
                  value={
                    currentStyle?.backgroundColor
                      ? (currentStyle.backgroundColor as `#${string}`)
                      : "#FFFFFF"
                  }
                  onValueChange={(value) => {
                    handleStyle("backgroundColor", value.hex);
                  }}
                  swatches={[
                    "#AEDEAE",
                    "#FFD3B6",
                    "#FFB6B9",
                    "#FFC0CB",
                    "#FFD1DC",
                  ]}
                  label={"Background color"}
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
                  handleChange={(newValue) =>
                    handleStyle("opacity", newValue)
                  }
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
