import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import { Scan } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";

const NavPaddingEditor = () => {
  const { handleStyleChange } = useComponentStyleMutation();
  const { currentStyle } = useCurrentComponent();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Padding properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              placeholder={"padding"}
              character={"P"}
              // type={"number"}
              // min={0}
              triggerChange={(newValue) =>
                handleStyleChange("padding", newValue)
              }
              value={currentStyle?.padding}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2 w-56">
                <DropdownMenuLabel>Padding details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-left"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-top"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-right"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingRight}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-bottom"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingBottom}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-vertical"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingVertical}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-horizontal"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.paddingHorizontal}
                    />
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavPaddingEditor;
