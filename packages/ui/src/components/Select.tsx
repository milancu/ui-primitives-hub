import {Select as SelectPrimitives} from "@base-ui-components/react/select";
import React from "react";
import {cn} from "../lib/utils.ts";

const SelectRoot = SelectPrimitives.Root


const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Trigger>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Trigger
    ref={ref}
    className={cn(
      "__TRIGGER_CLASSNAME__",
      "hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800",
      className
    )}
    {...props}
  />
));

const SelectValue = SelectPrimitives.Value;

const SelectIcon = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Icon>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Icon>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Icon
    ref={ref}
    className={cn("flex", className, "__ICON_CLASSNAME__")}
    {...props}
  />
));

const SelectPortal = SelectPrimitives.Portal;

const SelectPositioner = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Positioner>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Positioner>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Positioner
    ref={ref}
    className={cn("outline-none", className, "__POSITIONER_CLASSNAME__")}
    {...props}
  />
));

const SelectScrollUpArrow = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollUpArrow>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollUpArrow>
>(({className, ...props}, ref) => (
  <SelectPrimitives.ScrollUpArrow
    ref={ref}
    className={cn(
      "top-0 z-[1] cursor-default bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]",
      className,
      "__SCROLL_UP_ARROW_CLASSNAME__"
    )}
    {...props}
  />
));

const SelectPopup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Popup>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Popup>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Popup
    ref={ref}
    className={cn(
      "group [max-height:var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto bg-[canvas] outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:scale-100 data-[ending-style]:opacity-0 data-[ending-style]:opacity-100 data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
      className,
      "__POPUP_CLASSNAME__"
    )}
    {...props}
  />
));

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Item>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Item
    ref={ref}
    className={cn(
      "min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900",
      className,
      "__ITEM_CLASSNAME__"
    )}
    {...props}
  />
));

const SelectItemIndicator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ItemIndicator>
>(({className, ...props}, ref) => (
  <SelectPrimitives.ItemIndicator
    ref={ref}
    className={cn("col-start-1", className, "__ITEM_INDICATOR_CLASSNAME__")}
    {...props}
  />
));

const SelectItemText = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ItemText>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ItemText>
>(({className, ...props}, ref) => (
  <SelectPrimitives.ItemText
    ref={ref}
    className={cn("col-start-2", className, "__ITEM_TEXT_CLASSNAME__")}
    {...props}
  />
));

const SelectScrollDownArrow = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.ScrollDownArrow>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.ScrollDownArrow>
>(({className, ...props}, ref) => (
  <SelectPrimitives.ScrollDownArrow
    ref={ref}
    className={cn(
      "bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]",
      className,
      "__SCROLL_DOWN_ARROW_CLASSNAME__"
    )}
    {...props}
  />
));

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Group>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Group
    ref={ref}
    className={cn(className, "__GROUP_CLASSNAME__")}
    {...props}
  />
));

const SelectGroupLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.GroupLabel>
>(({className, ...props}, ref) => (
  <SelectPrimitives.GroupLabel
    ref={ref}
    className={cn(className, "__GROUP_LABEL_CLASSNAME__")}
    {...props}
  />
));

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitives.Separator>
>(({className, ...props}, ref) => (
  <SelectPrimitives.Separator
    ref={ref}
    className={cn(className, "__SEPARATOR_CLASSNAME__")}
    {...props}
  />
));


function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5"/>
      <path d="M0.5 7.5L4 10.5L7.5 7.5"/>
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path
        d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z"/>
    </svg>
  );
}


SelectTrigger.displayName = "SelectTrigger";
SelectIcon.displayName = "SelectIcon";
SelectPositioner.displayName = "SelectPositioner";
SelectScrollUpArrow.displayName = "SelectScrollUpArrow";
SelectPopup.displayName = "SelectPopup";
SelectItem.displayName = "SelectItem";
SelectItemIndicator.displayName = "SelectItemIndicator";
SelectItemText.displayName = "SelectItemText";
SelectScrollDownArrow.displayName = "SelectScrollDownArrow";
SelectGroup.displayName = "SelectGroup";
SelectGroupLabel.displayName = "SelectGroupLabel";
SelectSeparator.displayName = "SelectSeparator";

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectScrollUpArrow,
  SelectPopup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectScrollDownArrow,
  ChevronUpDownIcon,
  CheckIcon,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator
};