import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import { Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

const NavTextEditor = () => {
  const { handleStyleChange } = useComponentStyleMutation();
  const { currentStyle } = useCurrentComponent();

  return (
    <Collapsible title={"Text properties"} className="group/collapsible">
      <SidebarGroup className={"p-0"}>
        <SidebarGroupLabel asChild className="group/label">
          <CollapsibleTrigger>
            Text properties
            <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className={"p-2"}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"font-size"}
                  value={currentStyle?.fontSize}
                  triggerChange={(newValue) =>
                    handleStyleChange("fontSize", newValue)
                  }
                  character={"S"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  placeholder={"font-weight"}
                  value={currentStyle?.fontSize}
                  triggerChange={(newValue) =>
                    handleStyleChange("fontWeight", newValue)
                  }
                  character={"W"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select
                  value={currentStyle?.textAlign}
                  onValueChange={(value) => {
                    handleStyleChange("textAlign", value);
                  }}
                >
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      text-align:{" "}
                      <SelectValue placeholder="Select a text-align" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">left</SelectItem>
                    <SelectItem value="center">center</SelectItem>
                    <SelectItem value="right">right</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select
                  value={currentStyle?.textTransform}
                  onValueChange={(value) => {
                    handleStyleChange("textTransform", value);
                  }}
                >
                  <SelectTrigger>
                    <span className="text-muted-foreground">
                      text-transform:{" "}
                      <SelectValue placeholder="Select a text-transform" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="capitalize">capitalize</SelectItem>
                    <SelectItem value="uppercase">uppercase</SelectItem>
                    <SelectItem value="lowercase">lowercase</SelectItem>
                  </SelectContent>
                </Select>
              </SidebarMenuItem>
              <SidebarMenuItem className={"flex gap-1"}>
                <ColorPicker
                  hideContrastRatio={true}
                  value={
                    currentStyle?.color
                      ? (currentStyle?.color as `#${string}`)
                      : "#FFFFFF"
                  }
                  label={"color"}
                  onValueChange={(value) => {
                    handleStyleChange("color", value.hex);
                  }}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavTextEditor;
