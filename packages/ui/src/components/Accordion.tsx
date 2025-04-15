import {Accordion as AccordionPrimitives} from "@base-ui-components/react/accordion";
import React from "react";
import {cn} from "../lib/utils.ts";

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
  >
    {props.children}
    <PlusIcon/>
  </AccordionPrimitives.Trigger>
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

function PlusIcon(props: React.ComponentProps<'svg'>) {
  return (
      <svg viewBox="0 0 12 12" fill="currentcolor" {...props}
           className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:scale-110 group-data-[panel-open]:rotate-45">
      <path d="M6.75 0H5.25V5.25H0V6.75L5.25 6.75V12H6.75V6.75L12 6.75V5.25H6.75V0Z" />
    </svg>
  );
}

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
  PlusIcon
};


// <AccordionRoot>
//   <AccordionItem>
//     <AccordionHeader>
//       <AccordionTrigger>
//         What is Base UI?
//       </AccordionTrigger>
//     </AccordionHeader>
//     <AccordionPanel>
//       <div>
//         Base UI is a library of high-quality unstyled React components for design
//         systems and web apps.
//       </div>
//     </AccordionPanel>
//   </AccordionItem>
//
//   <AccordionItem>
//     <AccordionHeader>
//       <AccordionTrigger>
//         How do I get started?
//       </AccordionTrigger>
//     </AccordionHeader>
//     <AccordionPanel>
//       <div>
//         Head to the “Quick start” guide in the docs. If you’ve used unstyled
//         libraries before, you’ll feel at home.
//       </div>
//     </AccordionPanel>
//   </AccordionItem>
//
//   <AccordionItem>
//     <AccordionHeader>
//       <AccordionTrigger>
//         Can I use it for my project?
//       </AccordionTrigger>
//     </AccordionHeader>
//     <AccordionPanel>
//       <div>
//         Of course! Base UI is free and open source.
//       </div>
//     </AccordionPanel>
//   </AccordionItem>
// </AccordionRoot>

