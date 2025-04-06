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
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";
import { useStyleStore } from "@/hooks/store/style-store.ts";

const NavPaddingEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Padding properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputComponentUnitSwitcher
              placeholder={"padding"}
              character={"P"}
              handleChange={(newValue) => handleStyle("padding", newValue)}
              value={style?.padding ?? ""}
              unit={"rem"}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <Scan />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4 w-56">
                <DropdownMenuLabel>Padding details</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"padding-left"}
                      handleChange={(newValue) =>
                        handleStyle("paddingLeft", newValue)
                      }
                      value={style?.paddingLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"padding-top"}
                      handleChange={(newValue) =>
                        handleStyle("paddingTop", newValue)
                      }
                      value={style?.paddingTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"padding-right"}
                      value={style?.paddingRight}
                      handleChange={(newValue) =>
                        handleStyle("paddingRight", newValue)
                      }
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"padding-bottom"}
                      handleChange={(newValue) =>
                        handleStyle("paddingBottom", newValue)
                      }
                      value={style?.paddingBottom}
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
