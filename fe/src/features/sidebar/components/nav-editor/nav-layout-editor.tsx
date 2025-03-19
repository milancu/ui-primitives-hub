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
import InputWithIcon from "@/components/ui/input-with-icon.tsx";
import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { useComponentStyleMutation } from "@/hooks/use-component-style-mutation.ts";
import InputComponentSwitcher from "@/components/ui/input-component-switcher.tsx";

const NavLayoutEditor = () => {
  const { currentStyle } = useCurrentComponent();
  const { handleStyleChange } = useComponentStyleMutation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layout properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={"gap-2"}>
          <SidebarMenuItem>
            <InputComponentSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <RadioGroup
              onValueChange={(e) => {
                handleStyleChange("display", e);
              }}
              className="grid grid-cols-2 gap-1"
              value={currentStyle?.display}
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
          {currentStyle?.display === "flex" && (
            <SidebarMenuItem>
              <RadioGroup
                className="grid grid-cols-2 gap-1"
                value={currentStyle.flexDirection}
                onValueChange={(e) => {
                  handleStyleChange("flexDirection", e);
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
          )}
          {currentStyle?.display === "flex" && (
            <SidebarMenuItem>
              <RadioGroup
                className="grid grid-cols-2 gap-1"
                value={currentStyle.flexWrap}
                onValueChange={(e) => {
                  handleStyleChange("flexWrap", e);
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
          )}
          {currentStyle?.display === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"mt-2 space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Gap
                </legend>
                <InputWithIcon
                  value={currentStyle?.gap}
                  placeholder={"gap"}
                  character={"G"}
                  triggerChange={(newValue) =>
                    handleStyleChange("gap", newValue)
                  }
                />
              </fieldset>
            </SidebarMenuItem>
          )}
          {currentStyle?.display === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Align items
                </legend>
                <RadioGroup
                  className="grid grid-cols-3 gap-1"
                  value={currentStyle?.alignItems}
                  onValueChange={(e) => {
                    handleStyleChange("alignItems", e);
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
          )}
          {currentStyle?.display === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Justify content
                </legend>
                <RadioGroup
                  className="grid grid-cols-3 gap-1"
                  value={currentStyle?.justifyContent}
                  onValueChange={(e) => {
                    handleStyleChange("justifyContent", e);
                  }}
                >
                  <label className="border-input has-[:focus-visible]:outline-ring/70 relative col-span-full flex cursor-pointer flex-row items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                    <RadioGroupItem
                      value={"space-between"}
                      className="sr-only after:absolute after:inset-0"
                    />
                    <AlignHorizontalSpaceBetween
                      size={14}
                      className={"inline"}
                    />
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
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavLayoutEditor;
