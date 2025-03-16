import { useRouter } from "@tanstack/react-router";
import { Drawer } from "vaul";
import { ScriptCopyBtn } from "@/components/ui/script-copy-button.tsx";
import { CodeBlock } from "@/features/code-block/components/code-block";

const accordionCode = `import { Accordion as AccordionPrimitives } from "@base-ui-components/react/accordion";
import React from "react";
import { cn } from "./lib/utils.ts";

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Root
    ref={ref}
    {...props}
    className={cn(className, "__ROOT_CLASSNAME__")}
  />
));

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Item
    ref={ref}
    {...props}
    className={cn(className, "__ITEM_CLASSNAME__", "transition-[all]")}
  />
));

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Header>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Header
    ref={ref}
    {...props}
    className={cn("__HEADER_CLASSNAME__", className)}
  />
));

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Trigger
    ref={ref}
    {...props}
    className={cn("__TRIGGER_CLASSNAME__", className, "group")}
  />
));

const AccordionPanel = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitives.Panel>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Panel>
>(({ className, ...props }, ref) => (
  <AccordionPrimitives.Panel
    keepMounted={true}
    ref={ref}
    {...props}
    className={cn("__PANEL_CLASSNAME__", className, "transition-[all]")}
  />
));

AccordionRoot.displayName = "AccordionRoot";
AccordionItem.displayName = "AccordionItem";
AccordionHeader.displayName = "AccordionHeader";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionPanel.displayName = "AccordionPanel";

export {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
};`

const CodePreviewSheet = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const customCommandMap = {
    pnpm: `pnpm dlx ui-primitives-hub@latest add ${pathname}`,
    npm: `npm run ui-primitives-hub add ${pathname}`,
    yarn: `yarn ui-primitives-hub add ${pathname}`,
    bun: `bun x ui-primitives-hub@latest add ${pathname}`,
  };

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:text-white dark:hover:bg-[#1A1A19]">
        Code Preview
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-10" />
        <Drawer.Content
          className="fixed top-2 right-2 bottom-2 z-10 flex w-[510px] outline-none"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          <div className="flex h-full w-full grow flex-col rounded-[16px] bg-zinc-50 p-5">
            <div className="max-w-md">
              <Drawer.Title className="mb-2 font-bold text-zinc-900">
                Code Preview
              </Drawer.Title>
              <Drawer.Description className="mb-2 text-zinc-600">
                <ScriptCopyBtn
                  showMultiplePackageOptions={true}
                  codeLanguage="shell"
                  lightTheme="nord"
                  darkTheme="vitesse-dark"
                  commandMap={customCommandMap}
                />
              </Drawer.Description>
              <CodeBlock code={accordionCode} language="tsx" className="mb-8" />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default CodePreviewSheet;
