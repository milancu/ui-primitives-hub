import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown, Plus } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";

const NavBackgroundEditor = () => {
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
                  value={"#AEDEAE"}
                  swatches={[
                    "#AEDEAE",
                    "#FFD3B6",
                    "#FFB6B9",
                    "#FFC0CB",
                    "#FFD1DC",
                  ]}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <div
                      className="mr-2 h-4 w-4 rounded-full shadow-sm"
                      style={{ backgroundColor: "#AEDEAE" }}
                    />
                    <span className="text-muted-foreground flex-grow">
                      background color #AEDEAE
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </ColorPicker>
              </SidebarMenuItem>
              <SidebarMenuItem className={"flex gap-1"}>
                <ColorPicker
                  hideContrastRatio={true}
                  value={"#AEDEAE"}
                  swatches={[
                    "#AEDEAE",
                    "#FFD3B6",
                    "#FFB6B9",
                    "#FFC0CB",
                    "#FFD1DC",
                  ]}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <div
                      className="mr-2 h-4 w-4 rounded-full shadow-sm"
                      style={{ backgroundColor: "#AEDEAE" }}
                    />
                    <span className="text-muted-foreground flex-grow">
                      background #AEDEAE
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </ColorPicker>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <InputWithIcon
                  character={"O"}
                  placeholder={"opacity"}
                  type={"number"}
                  min={0}
                  max={100}
                  step={5}
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
