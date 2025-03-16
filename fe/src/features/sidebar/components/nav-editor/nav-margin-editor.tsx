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
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";

const NavMarginEditor = () => {
  const { currentStyle } = useCurrentComponent();
  const { handleStyleChange } = useComponentStyleMutation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Margin properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              placeholder={"margin"}
              character={"M"}
              triggerChange={(newValue) =>
                handleStyleChange("margin", newValue)
              }
              value={currentStyle?.margin}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2 w-56">
                <DropdownMenuLabel>Margin details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-left"}
                      onChange={(e) =>
                        handleStyleChange("marginLeft", e.target.value)
                      }
                      value={currentStyle?.marginLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-top"}
                      onChange={(e) =>
                        handleStyleChange("marginTop", e.target.value)
                      }
                      value={currentStyle?.marginTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-right"}
                      onChange={(e) =>
                        handleStyleChange("marginRight", e.target.value)
                      }
                      value={currentStyle?.marginRight}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-bottom"}
                      onChange={(e) =>
                        handleStyleChange("marginBottom", e.target.value)
                      }
                      value={currentStyle?.marginBottom}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-vertical"}
                      onChange={(e) =>
                        handleStyleChange("marginVertical", e.target.value)
                      }
                      value={currentStyle?.marginVertical}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-horizontal"}
                      onChange={(e) =>
                        handleStyleChange("marginHorizontal", e.target.value)
                      }
                      value={currentStyle?.marginHorizontal}
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

export default NavMarginEditor;
