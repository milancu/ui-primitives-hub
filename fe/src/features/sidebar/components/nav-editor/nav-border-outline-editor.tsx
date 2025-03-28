import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Scan, SquareRoundCorner } from "lucide-react";
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
import { useStyle } from "@/components/style-provider.tsx";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";
import { ColorSelect } from "@/components/ui/color-select.tsx";

const NavBorderOutlineEditor = () => {
  const { style: currentStyle, handleStyle } = useStyle();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Border properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputComponentUnitSwitcher
              handleChange={(value) => {
                handleStyle("borderWidth", value);
              }}
              placeholder={"border width"}
              character={"B"}
              value={currentStyle?.borderWidth}
              unit={"px"}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 w-56">
                <DropdownMenuLabel>Border width details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"left"}
                      value={currentStyle?.borderLeftWidth}
                      handleChange={(value) => {
                        handleStyle("borderLeftWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"top"}
                      value={currentStyle?.borderTopWidth}
                      handleChange={(value) => {
                        handleStyle("borderTopWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"bottom"}
                      value={currentStyle?.borderBottomWidth}
                      handleChange={(value) => {
                        handleStyle("borderBottomWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"right"}
                      value={currentStyle?.borderRightWidth}
                      handleChange={(value) => {
                        handleStyle("borderRightWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/*<ColorPicker*/}
            {/*  hideContrastRatio={true}*/}
            {/*  value={*/}
            {/*    currentStyle?.borderColor*/}
            {/*      ? (currentStyle?.borderColor as `#${string}`)*/}
            {/*      : "#FFFFFF"*/}
            {/*  }*/}
            {/*  onValueChange={(value) => handleStyle("borderColor", value.hex)}*/}
            {/*  swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}*/}
            {/*  label={"Border color "}*/}
            {/*/>*/}
            <ColorSelect
              placeholder={"Border"}
              value={currentStyle?.borderColor}
              handleChange={(newValue) => {
                handleStyle("borderColor", newValue);
              }}
            />
          </SidebarMenuItem>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputComponentUnitSwitcher
              value={currentStyle?.borderRadius}
              handleChange={(value) => {
                handleStyle("borderRadius", value);
              }}
              placeholder={"border radius"}
              icon={SquareRoundCorner}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 w-56">
                <DropdownMenuLabel>Border radius details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"left-top"}
                      handleChange={(value) => {
                        handleStyle("borderRadiusTopLeft", value);
                      }}
                      value={currentStyle?.borderRadiusTopLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"right-top"}
                      handleChange={(value) => {
                        handleStyle("borderRadiusTopRight", value);
                      }}
                      value={currentStyle?.borderRadiusTopRight}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"left-bottom"}
                      handleChange={(value) => {
                        handleStyle("borderRadiusBottomLeft", value);
                      }}
                      value={currentStyle?.borderRadiusBottomLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"right-bottom"}
                      handleChange={(value) => {
                        handleStyle("borderRadiusBottomRight", value);
                      }}
                      value={currentStyle?.borderRadiusBottomRight}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputComponentUnitSwitcher
              value={currentStyle?.outlineWidth}
              handleChange={(value) => {
                handleStyle("outlineWidth", value);
              }}
              placeholder={"outline width"}
              character={"O"}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            {/*<ColorPicker*/}
            {/*  hideContrastRatio={true}*/}
            {/*  value={*/}
            {/*    currentStyle?.outlineColor*/}
            {/*      ? (currentStyle?.outlineColor as `#${string}`)*/}
            {/*      : "#FFFFFF"*/}
            {/*  }*/}
            {/*  swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}*/}
            {/*  label={"Outline color"}*/}
            {/*/>*/}
            <ColorSelect
              placeholder={"Outline"}
              value={currentStyle?.outlineColor}
              handleChange={(newValue) => {
                handleStyle("outlineColor", newValue);
              }}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Input
              placeholder={"outline style"}
              type={"text"}
              onChange={(e) => {
                handleStyle("outlineStyle", e.target.value);
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBorderOutlineEditor;
