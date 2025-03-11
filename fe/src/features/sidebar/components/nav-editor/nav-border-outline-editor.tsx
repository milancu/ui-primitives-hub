import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import {
  ChevronDown,
  Scan,
  SquareRoundCorner,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";

const NavBorderOutlineEditor = () => {
  const { handleStyleChange, currentStyle } = useComponentStyleMutation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Border properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              triggerChange={(value)=>{handleStyleChange('borderWidth', value)}}
              placeholder={"border width"}
              character={'B'}
              // type={"number"}
              // min={0}
              value={currentStyle?.borderWidth}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2 w-56">
                <DropdownMenuLabel>Border width details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Input placeholder={"left"} type={"number"} min={0} />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input placeholder={"top"} type={"number"} min={0} />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"bottom"}
                      type={"number"}
                      min={0}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"bottom"}
                      type={"number"}
                      min={0}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ColorPicker
              hideContrastRatio={true}
              value={currentStyle?.borderColor ? currentStyle?.borderColor : '#FFFFFF'}
              onValueChange={(value)=>handleStyleChange('borderColor', value)}
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
                <span className="flex-grow">Border color #AEDEAE</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </ColorPicker>
          </SidebarMenuItem>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              value={currentStyle?.borderRadius}
              triggerChange={(value)=>{handleStyleChange('borderRadius', value)}}
              placeholder={"border radius"}
              icon={SquareRoundCorner}
              // type={"number"}
              // min={0}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2 w-56">
                <DropdownMenuLabel>Border radius details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Input placeholder={"left-top"} type={"number"} min={0} />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input placeholder={"right-top"} type={"number"} min={0} />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"left-bottom"}
                      type={"number"}
                      min={0}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"right-bottom"}
                      type={"number"}
                      min={0}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              value={currentStyle?.outlineWidth}
              triggerChange={(value)=>{handleStyleChange('outlineWidth', value)}}
              placeholder={"outline width"}
              character={"O"}
              // type={"number"}
              // min={0}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
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
                <span className="flex-grow">Outline color #AEDEAE</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </ColorPicker>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Input
              placeholder={"outline style"}
              type={"text"}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBorderOutlineEditor;
