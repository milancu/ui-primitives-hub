import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDown } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";

const NavBackgroundEditor = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Background properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <ColorPicker
              hideContrastRatio={true}
              value={"#AEDEAE"}
              swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <div
                  className="w-4 h-4 rounded-full mr-2 shadow-sm"
                  style={{ backgroundColor: '#AEDEAE' }}
                />
                <span className="flex-grow text-muted-foreground">background color #AEDEAE</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </ColorPicker>
          </SidebarMenuItem>
          <SidebarMenuItem className={"flex gap-1"}>
            <ColorPicker
              hideContrastRatio={true}
              value={"#AEDEAE"}
              swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}
            >
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <div
                  className="w-4 h-4 rounded-full mr-2 shadow-sm"
                  style={{ backgroundColor: '#AEDEAE' }}
                />
                <span className="flex-grow text-muted-foreground">background #AEDEAE</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </ColorPicker>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
            character={'O'}
            placeholder={'opacity'}
            type={'number'}
            min={0}
            max={100}
            step={5}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBackgroundEditor;
