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

const NavMarginEditor = () => {
  const { currentStyle } = useCurrentComponent();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Margin properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputWithIcon
              placeholder={"margin"}
              character={"M"}
              // type={"number"}
              // min={0}
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
                      type={"number"}
                      min={0}
                      value={currentStyle?.marginLeft}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-top"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.marginTop}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-right"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.marginRight}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-bottom"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.marginBottom}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-vertical"}
                      type={"number"}
                      min={0}
                      value={currentStyle?.marginVertical}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <Input
                      placeholder={"margin-horizontal"}
                      type={"number"}
                      min={0}
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
