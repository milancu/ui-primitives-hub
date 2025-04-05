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

const NavMarginEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);

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
              value={style?.margin}
            />
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <Button variant="outline" size={"icon"}>*/}
            {/*      <Scan />*/}
            {/*    </Button>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent className="mr-4 w-56">*/}
            {/*    <DropdownMenuLabel>Margin details</DropdownMenuLabel>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuGroup>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-left"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginLeft", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginLeft}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-top"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginTop", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginTop}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-right"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginRight", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginRight}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-bottom"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginBottom", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginBottom}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-vertical"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginVertical", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginVertical}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*      <DropdownMenuLabel>*/}
            {/*        <InputComponentUnitSwitcher*/}
            {/*          placeholder={"margin-horizontal"}*/}
            {/*          handleChange={(newValue) =>*/}
            {/*            handleStyle("marginHorizontal", newValue)*/}
            {/*          }*/}
            {/*          value={style?.marginHorizontal}*/}
            {/*        />*/}
            {/*      </DropdownMenuLabel>*/}
            {/*    </DropdownMenuGroup>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMarginEditor;
