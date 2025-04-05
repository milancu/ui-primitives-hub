import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import {
  AlignCenterVertical,
  AlignEndVertical,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignStartVertical,
  BrickWall,
  Grid2x2Plus,
  StretchHorizontal,
  StretchVertical,
} from "lucide-react";
import InputComponentUnitSwitcher from "@/components/ui/input-component-unit-switcher.tsx";
import { cn } from "@/lib/utils.ts";
import { useStyleStore } from "@/hooks/store/style-store.ts";

const NavLayoutEditor = () => {
  const style = useStyleStore((state) => state.style);
  const handleStyle = useStyleStore((state) => state.handleStyle);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layout properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={"gap-2"}>
          <SidebarMenuItem>
            <RadioGroup
              onValueChange={(e) => {
                handleStyle("display", e);
              }}
              className="grid grid-cols-2 gap-1"
              value={style?.display}
            >
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"flex"}
                  className="sr-only after:absolute after:inset-0"
                />
                <Grid2x2Plus size={16} />
                <p className="text-sm leading-none font-medium">Flex</p>
              </label>
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"block"}
                  className="sr-only after:absolute after:inset-0"
                />
                <BrickWall size={16} />
                <p className="text-sm leading-none font-medium">Block</p>
              </label>
            </RadioGroup>
          </SidebarMenuItem>
          <SidebarMenuItem
            className={cn(style?.display === "flex" ? "block" : "hidden")}
          >
            <RadioGroup
              className="grid grid-cols-2 gap-1"
              value={style?.flexDirection}
              onValueChange={(e) => {
                handleStyle("flexDirection", e);
              }}
            >
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"column"}
                  className="sr-only after:absolute after:inset-0"
                />
                <StretchHorizontal size={16} />
                <p className="text-sm leading-none font-medium">Column</p>
              </label>
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"row"}
                  className="sr-only after:absolute after:inset-0"
                />
                <StretchVertical size={16} />
                <p className="text-sm leading-none font-medium">Row</p>
              </label>
            </RadioGroup>
          </SidebarMenuItem>
          <SidebarMenuItem
            className={cn(style?.display === "flex" ? "block" : "hidden")}
          >
            <RadioGroup
              className="grid grid-cols-2 gap-1"
              value={style?.flexWrap}
              onValueChange={(e) => {
                handleStyle("flexWrap", e);
              }}
            >
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"wrap"}
                  className="sr-only after:absolute after:inset-0"
                />
                <p className="text-sm leading-none font-medium">Wrap</p>
              </label>
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"nowrap"}
                  className="sr-only after:absolute after:inset-0"
                />
                <p className="text-sm leading-none font-medium">No Wrap</p>
              </label>
            </RadioGroup>
          </SidebarMenuItem>
          <SidebarMenuItem
            className={cn(style?.display === "flex" ? "block" : "hidden")}
          >
            <fieldset className={"mt-2 space-y-1"}>
              <legend className={"text-sidebar-foreground/70 text-xs"}>
                Gap
              </legend>
              <InputComponentUnitSwitcher
                placeholder={"gap"}
                character={"G"}
                handleChange={(newValue) => handleStyle("gap", newValue)}
                value={style?.gap ?? ""}
              />
            </fieldset>
          </SidebarMenuItem>
          <SidebarMenuItem
            className={cn(style?.display === "flex" ? "block" : "hidden")}
          >
            <fieldset className={"space-y-1"}>
              <legend className={"text-sidebar-foreground/70 text-xs"}>
                Align items
              </legend>
              <RadioGroup
                className="grid grid-cols-3 gap-1"
                value={style?.alignItems}
                onValueChange={(e) => {
                  handleStyle("alignItems", e);
                }}
              >
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"start"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm leading-none font-medium">Start</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"center"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm leading-none font-medium">Center</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"end"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm leading-none font-medium">End</p>
                </label>
              </RadioGroup>
            </fieldset>
          </SidebarMenuItem>
          <SidebarMenuItem
            className={cn(style?.display === "flex" ? "block" : "hidden")}
          >
            <fieldset className={"space-y-1"}>
              <legend className={"text-sidebar-foreground/70 text-xs"}>
                Justify content
              </legend>
              <RadioGroup
                className="grid grid-cols-3 gap-1"
                value={style?.justifyContent}
                onValueChange={(e) => {
                  handleStyle("justifyContent", e);
                }}
              >
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative col-span-full flex cursor-pointer flex-row items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"space-between"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <AlignHorizontalSpaceBetween size={14} className={"inline"} />
                  <p className="text-sm leading-none font-medium">
                    Space between
                  </p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"start"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <AlignStartVertical size={14} />
                  <p className="text-sm leading-none font-medium">Start</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"center"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <AlignCenterVertical size={14} />
                  <p className="text-sm leading-none font-medium">Center</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"end"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <AlignEndVertical size={14} />
                  <p className="text-sm leading-none font-medium">End</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative col-span-full flex cursor-pointer flex-row items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"space-around"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <AlignHorizontalSpaceAround size={14} />
                  <p className="text-sm leading-none font-medium">
                    Space around
                  </p>
                </label>
              </RadioGroup>
            </fieldset>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLayoutEditor;
