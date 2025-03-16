import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
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
import { ColorPicker } from "@/components/ui/color-picker.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

const NavBorderOutlineEditor = () => {
  const { handleStyleChange } = useComponentStyleMutation();
  const { currentStyle } = useCurrentComponent();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Border properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              triggerChange={(value) => {
                handleStyleChange("borderWidth", value);
              }}
              placeholder={"border width"}
              character={"B"}
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
                    <Input
                      placeholder={"left"}
                      onChange={(e) => {
                        handleStyleChange("borderLeftWidth", e.target.value);
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"top"}
                      onChange={(e) => {
                        handleStyleChange("borderTopWidth", e.target.value);
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"bottom"}
                      onChange={(e) => {
                        handleStyleChange("borderBottomWidth", e.target.value);
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"right"}
                      onChange={(e) => {
                        handleStyleChange("borderRightWidth", e.target.value);
                      }}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ColorPicker
              hideContrastRatio={true}
              value={
                currentStyle?.borderColor
                  ? (currentStyle?.borderColor as `#${string}`)
                  : "#FFFFFF"
              }
              onValueChange={(value) =>
                handleStyleChange("borderColor", value.hex)
              }
              swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}
              label={"Border color "}
            />
          </SidebarMenuItem>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              value={currentStyle?.borderRadius}
              triggerChange={(value) => {
                handleStyleChange("borderRadius", value);
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
              <DropdownMenuContent className="mr-2 w-56">
                <DropdownMenuLabel>Border radius details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"left-top"}
                      onChange={(e) => {
                        handleStyleChange(
                          "borderRadiusTopLeft",
                          e.target.value,
                        );
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"right-top"}
                      onChange={(e) => {
                        handleStyleChange(
                          "borderRadiusTopRight",
                          e.target.value,
                        );
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"left-bottom"}
                      onChange={(e) => {
                        handleStyleChange(
                          "borderRadiusBottomLeft",
                          e.target.value,
                        );
                      }}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"right-bottom"}
                      onChange={(e) => {
                        handleStyleChange(
                          "borderRadiusBottomRight",
                          e.target.value,
                        );
                      }}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputWithIcon
              value={currentStyle?.outlineWidth}
              triggerChange={(value) => {
                handleStyleChange("outlineWidth", value);
              }}
              placeholder={"outline width"}
              character={"O"}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ColorPicker
              hideContrastRatio={true}
              value={
                currentStyle?.outlineColor
                  ? (currentStyle?.outlineColor as `#${string}`)
                  : "#FFFFFF"
              }
              swatches={["#AEDEAE", "#FFD3B6", "#FFB6B9", "#FFC0CB", "#FFD1DC"]}
              label={"Outline color"}
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Input
              placeholder={"outline style"}
              type={"text"}
              onChange={(e) => {
                handleStyleChange("outlineStyle", e.target.value);
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBorderOutlineEditor;
