import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";
import { ColorSelect } from "@/components/ui/color-select.tsx";
import { useStyleStore } from "@/hooks/store/style-store.ts";

const NavTextEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);
  
  return (
    <Collapsible title={"Text properties"} className="group/collapsible" >
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
                <InputComponentUnitSwitcher
                  placeholder={"font-size"}
                  character={"S"}
                  handleChange={(newValue) => handleStyle("fontSize", newValue)}
                  value={style?.fontSize}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputComponentUnitSwitcher
                  placeholder={"font-weight"}
                  value={style?.fontWeight}
                  handleChange={(newValue) =>
                    handleStyle("fontWeight", newValue)
                  }
                  unit={'px'}
                  character={"W"}
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Select
                  value={style?.textAlign}
                  onValueChange={(value) => {
                    handleStyle("textAlign", value);
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
                  value={style?.textTransform}
                  onValueChange={(value) => {
                    handleStyle("textTransform", value);
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
                <ColorSelect
                  placeholder={"Text color"}
                  value={style?.color}
                  handleChange={(newValue) => {
                    handleStyle("color", newValue);
                  }}
                />
                {/*<ColorPicker*/}
                {/*  hideContrastRatio={false}*/}
                {/*  value={*/}
                {/*    style?.color*/}
                {/*      ? (style?.color as `#${string}`)*/}
                {/*      : "#FFFFFF"*/}
                {/*  }*/}
                {/*  label={"color"}*/}
                {/*  onValueChange={(value) => {*/}
                {/*    handleStyle("color", value.hex);*/}
                {/*  }}*/}
                {/*/>*/}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default NavTextEditor;
