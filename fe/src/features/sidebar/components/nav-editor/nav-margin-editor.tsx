import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
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
import { useStyle } from "@/components/style-provider";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";

const NavMarginEditor = () => {
  const { style: currentStyle, handleStyle } = useStyle();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Margin properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputComponentUnitSwitcher
              placeholder={"margin"}
              character={"M"}
              handleChange={(newValue) => handleStyle("margin", newValue)}
              value={currentStyle?.margin}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 w-56">
                <DropdownMenuLabel>Margin details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-left"}
                      handleChange={(newValue) =>
                        handleStyle("marginLeft", newValue)
                      }
                      value={currentStyle?.marginLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-top"}
                      handleChange={(newValue) =>
                        handleStyle("marginTop", newValue)
                      }
                      value={currentStyle?.marginTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-right"}
                      handleChange={(newValue) =>
                        handleStyle("marginRight", newValue)
                      }
                      value={currentStyle?.marginRight}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-bottom"}
                      handleChange={(newValue) =>
                        handleStyle("marginBottom", newValue)
                      }
                      value={currentStyle?.marginBottom}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-vertical"}
                      handleChange={(newValue) =>
                        handleStyle("marginVertical", newValue)
                      }
                      value={currentStyle?.marginVertical}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"margin-horizontal"}
                      handleChange={(newValue) =>
                        handleStyle("marginHorizontal", newValue)
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
