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
                      onChange={(e) =>
                        handleStyleChange("paddingLeft", e.target.value)
                      }
                      value={currentStyle?.paddingLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-top"}
                      onChange={(e) =>
                        handleStyleChange("paddingTop", e.target.value)
                      }
                      value={currentStyle?.paddingTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-right"}
                      value={currentStyle?.paddingRight}
                      onChange={(e) =>
                        handleStyleChange("paddingRight", e.target.value)
                      }
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-bottom"}
                      onChange={(e) =>
                        handleStyleChange("paddingBottom", e.target.value)
                      }
                      value={currentStyle?.paddingBottom}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-vertical"}
                      onChange={(e) =>
                        handleStyleChange("paddingVertical", e.target.value)
                      }
                      value={currentStyle?.paddingVertical}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"padding-horizontal"}
                      onChange={(e) =>
                        handleStyleChange("paddingHorizontal", e.target.value)
                      }
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
