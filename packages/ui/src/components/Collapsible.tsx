import {Collapsible as CollapsiblePrimitives} from "@base-ui-components/react/collapsible";
import React from "react";
import {cn} from "../lib/utils.ts";

const CollapsibleRoot = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitives.Root>
>(({className, ...props}, ref) => (
  <CollapsiblePrimitives.Root
    ref={ref}
    {...props}
    className={cn("flex min-h-36 w-56 flex-col justify-center text-gray-900", className, "__ROOT_CLASSNAME__")}
  />
));

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitives.Trigger>
>(({className, ...props}, ref) => (
  <CollapsiblePrimitives.Trigger
    ref={ref}
    {...props}
    className={cn(
      "group flex items-center gap-2 rounded-sm bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-200",
      className,
      "__TRIGGER_CLASSNAME__"
    )}
  />
));

const CollapsiblePanel = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitives.Panel>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitives.Panel>
>(({className, ...props}, ref) => (
  <CollapsiblePrimitives.Panel
    ref={ref}
    {...props}
    className={cn(
      "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
      className,
      "__PANEL_CLASSNAME__"
    )}
  />
));

function ChevronIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor"/>
    </svg>
  );
}

CollapsibleRoot.displayName = "CollapsibleRoot";
CollapsibleTrigger.displayName = "CollapsibleTrigger";
CollapsiblePanel.displayName = "CollapsiblePanel";

export {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsiblePanel,
  ChevronIcon
};

