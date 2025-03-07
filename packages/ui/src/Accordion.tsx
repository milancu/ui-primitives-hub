import { Accordion as AccordionPrimitives } from "@base-ui-components/react/accordion";
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
};
