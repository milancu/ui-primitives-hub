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
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

const NavBackgroundEditor = () => {
  const { handleStyleChange } = useComponentStyleMutation();
  const { currentStyle } = useCurrentComponent();

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
              {/*<SidebarMenuItem className={"flex gap-1"}>*/}
              {/*  <ColorPicker*/}
              {/*    onValueChange={(value)=>{*/}
              {/*      handleStyleChange('background', value.hex)*/}
              {/*    }}*/}
              {/*    hideContrastRatio={true}*/}
              {/*    value={currentStyle?.background ? currentStyle.background as `#${string}` : "#FFFFFF"}*/}
              {/*    swatches={[*/}
              {/*      "#AEDEAE",*/}
              {/*      "#FFD3B6",*/}
              {/*      "#FFB6B9",*/}
              {/*      "#FFC0CB",*/}
              {/*      "#FFD1DC",*/}
              {/*    ]}*/}
              {/*  >*/}
              {/*    <Button*/}
              {/*      variant="outline"*/}
              {/*      className="w-full justify-start text-left font-normal"*/}
              {/*    >*/}
              {/*      <div*/}
              {/*        className="mr-2 h-4 w-4 rounded-full shadow-sm"*/}
              {/*        style={{ backgroundColor: currentStyle?.background ? currentStyle.background as `#${string}` : "#FFFFFF" }}*/}
              {/*      />*/}
              {/*      <span className="text-muted-foreground flex-grow">*/}
              {/*        background color {currentStyle?.background ? currentStyle.background as `#${string}` : "#FFFFFF"}*/}
              {/*      </span>*/}
              {/*      <ChevronDown className="h-4 w-4 opacity-50" />*/}
              {/*    </Button>*/}
              {/*  </ColorPicker>*/}
              {/*</SidebarMenuItem>*/}
              <SidebarMenuItem className={"flex gap-1"}>
                <ColorPicker
                  hideContrastRatio={true}
                  value={
                    currentStyle?.backgroundColor
                      ? (currentStyle.backgroundColor as `#${string}`)
                      : "#FFFFFF"
                  }
                  onValueChange={(value) => {
                    handleStyleChange("backgroundColor", value.hex);
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
                  triggerChange={(newValue) =>
                    handleStyleChange("opacity", newValue)
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
