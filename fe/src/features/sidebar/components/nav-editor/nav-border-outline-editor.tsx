import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { Scan, SquareRoundCorner } from "lucide-react";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";
import { ColorSelect } from "@/components/ui/color-select.tsx";
import { useStyleStore } from "@/hooks/store/style-store.ts";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const NavBorderOutlineEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);

  const items = [
    { value: "0rem", label: "None" },
    { value: "0.25rem", label: "Small" },
    { value: "0.375rem", label: "Medium" },
    { value: "0.5rem", label: "Large" },
    { value: "1rem", label: "2XL" },
    { value: "9999px", label: "Full" },
    // { value: "custom", label: "Custom" },
  ];

  const currentValue = items.some((i) => i.value === style?.borderRadius)
    ? style?.borderRadius
    : "custom";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Border properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={"space-y-1"}>
          <SidebarMenuItem>
            <fieldset>
              <legend className="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear">
                Border radius
              </legend>
              <RadioGroup
                className="grid grid-cols-3 gap-1"
                value={currentValue}
                onValueChange={(val) => handleStyle("borderRadius", val)}
              >
                {items.map((item, index) => {
                  return (
                    <label
                      key={`${index}-${item.value}`}
                      className={cn(
                        "group border-input relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors",
                        "has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500",
                        "has-[:focus-visible]:outline-ring/70 has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                        "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50",
                      )}
                    >
                      <RadioGroupItem
                        id={`${index}-${item.value}`}
                        value={item.value}
                        className="sr-only after:absolute after:inset-0"
                      />
                      <div
                        className={cn(
                          "h-4 w-4 border-[1.5px] transition-colors",
                          `rounded-tr-[${item.value}]`,
                          currentValue === item.value && "border-blue-500",
                        )}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </label>
                  );
                })}
              </RadioGroup>
            </fieldset>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <InputComponentUnitSwitcher
              value={style?.borderRadius}
              handleChange={(value) => {
                handleStyle("borderRadius", value);
              }}
              placeholder={"border radius"}
              icon={SquareRoundCorner}
            />
          </SidebarMenuItem>
          <SidebarMenuItem className={"flex gap-1"}>
            <InputComponentUnitSwitcher
              handleChange={(value) => {
                handleStyle("borderWidth", value);
              }}
              placeholder={"border width"}
              character={"B"}
              value={style?.borderWidth}
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
                      value={style?.borderLeftWidth}
                      handleChange={(value) => {
                        handleStyle("borderLeftWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"top"}
                      value={style?.borderTopWidth}
                      handleChange={(value) => {
                        handleStyle("borderTopWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"bottom"}
                      value={style?.borderBottomWidth}
                      handleChange={(value) => {
                        handleStyle("borderBottomWidth", value);
                      }}
                      unit={"px"}
                    />
                  </DropdownMenuLabel>
                  <DropdownMenuLabel>
                    <InputComponentUnitSwitcher
                      placeholder={"right"}
                      value={style?.borderRightWidth}
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
            <ColorSelect
              placeholder={"Border color"}
              value={style?.borderColor}
              handleChange={(newValue) => {
                handleStyle("borderColor", newValue);
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavBorderOutlineEditor;
