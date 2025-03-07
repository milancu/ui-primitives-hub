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
import { useCallback, useState } from "react";
import InputWithIcon from "@/components/ui/input-with-icon.tsx";

const NavLayoutEditor = () => {
  const [selectedLayout, setSelectedLayout] = useState<string | undefined>();
  const [selectedWrappingProperty, setSelectedWrappingProperty] = useState<
    string | undefined
  >();

  const handleLayoutChange = useCallback((newLayout: string) => {
    setSelectedLayout(newLayout);
  }, []);

  const handleWrappingChange = useCallback((newWrappingProperty: string) => {
    setSelectedWrappingProperty(newWrappingProperty);
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layout properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className={"gap-2"}>
          <SidebarMenuItem>
            <RadioGroup
              className="grid grid-cols-2 gap-1"
              defaultValue={selectedLayout}
              onValueChange={handleLayoutChange}
            >
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"flex"}
                  className="sr-only after:absolute after:inset-0"
                />
                <Grid2x2Plus />
                <p className="text-sm leading-none font-medium">Flex</p>
              </label>
              <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                <RadioGroupItem
                  value={"block"}
                  className="sr-only after:absolute after:inset-0"
                />
                <BrickWall />
                <p className="text-sm leading-none font-medium">Block</p>
              </label>
            </RadioGroup>
          </SidebarMenuItem>
          {selectedLayout === "flex" && (
            <SidebarMenuItem>
              <RadioGroup
                className="grid grid-cols-2 gap-1"
                defaultValue={selectedWrappingProperty}
                onValueChange={handleWrappingChange}
              >
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"flex"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <StretchHorizontal />
                  <p className="text-sm leading-none font-medium">Column</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"block"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <StretchVertical />
                  <p className="text-sm leading-none font-medium">Row</p>
                </label>
              </RadioGroup>
            </SidebarMenuItem>
          )}
          {selectedLayout === "flex" && (
            <SidebarMenuItem>
              <RadioGroup
                className="grid grid-cols-2 gap-1"
                defaultValue={selectedWrappingProperty}
                onValueChange={handleWrappingChange}
              >
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"flex"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm leading-none font-medium">Wrap</p>
                </label>
                <label className="border-input has-[:focus-visible]:outline-ring/70 relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[:focus-visible]:outline-2 has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-50 has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-500/10 has-[[data-state=checked]]:text-blue-500">
                  <RadioGroupItem
                    value={"block"}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm leading-none font-medium">No Wrap</p>
                </label>
              </RadioGroup>
            </SidebarMenuItem>
          )}
          {selectedLayout === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"mt-2 space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Gap
                </legend>
                <InputWithIcon
                  placeholder={"gap"}
                  character={"G"}
                  type={"number"}
                  min={0}
                />
              </fieldset>
            </SidebarMenuItem>
          )}
          {selectedLayout === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Align items
                </legend>
                <RadioGroup className="flex flex-col gap-1">
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
          {selectedLayout === "flex" && (
            <SidebarMenuItem>
              <fieldset className={"space-y-1"}>
                <legend className={"text-sidebar-foreground/70 text-xs"}>
                  Justify content
                </legend>
                <RadioGroup className="grid grid-cols-3 gap-1">
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
