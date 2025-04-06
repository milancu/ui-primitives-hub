import {Popover as PopoverPrimitives} from "@base-ui-components/react/popover";
import React from "react";
import {cn} from "../lib/utils.ts";

const PopoverRoot = PopoverPrimitives.Root

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Trigger>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Trigger
    ref={ref}
    {...props}
    className={cn(
      "flex size-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100",
      className,
      "__TRIGGER_CLASSNAME__"
    )}
  />
));

const PopoverPortal = PopoverPrimitives.Portal;

const PopoverPositioner = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Positioner>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Positioner>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Positioner
    ref={ref}
    {...props}
    className={cn(className, "__POSITIONER_CLASSNAME__")}
  />
));

const PopoverPopup = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Popup>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Popup>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Popup
    ref={ref}
    {...props}
    className={cn(
      "origin-[var(--transform-origin)] rounded-lg bg-[canvas] px-6 py-4 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
      className,
      "__GROUP_CLASSNAME__"
    )}
  />
));

const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Arrow>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Arrow>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Arrow
    ref={ref}
    {...props}
    className={cn(
      "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      className,
      "__ARROW_CLASSNAME__"
    )}
  />
));

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Title>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Title
    ref={ref}
    {...props}
    className={cn("text-base font-medium", className, "__TITLE_CLASSNAME__")}
  />
));

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Description>
>(({className, ...props}, ref) => (
  <PopoverPrimitives.Description
    ref={ref}
    {...props}
    className={cn("text-base text-gray-600", className, "__DESCRIPTION_CLASSNAME__")}
  />
));

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      {...props}
    >
      <path d="M0.599976 5.39999L5.39998 0.599976L10.2 5.39999H0.599976Z"/>
    </svg>
  );
}

function BellIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg fill="currentcolor" width="20" height="20" viewBox="0 0 16 16" {...props}>
      <path
        d="M 8 1 C 7.453125 1 7 1.453125 7 2 L 7 3.140625 C 5.28125 3.589844 4 5.144531 4 7 L 4 10.984375 C 4 10.984375 3.984375 11.261719 3.851563 11.519531 C 3.71875 11.78125 3.558594 12 3 12 L 3 13 L 13 13 L 13 12 C 12.40625 12 12.253906 11.78125 12.128906 11.53125 C 12.003906 11.277344 12 11.003906 12 11.003906 L 12 7 C 12 5.144531 10.71875 3.589844 9 3.140625 L 9 2 C 9 1.453125 8.546875 1 8 1 Z M 8 13 C 7.449219 13 7 13.449219 7 14 C 7 14.550781 7.449219 15 8 15 C 8.550781 15 9 14.550781 9 14 C 9 13.449219 8.550781 13 8 13 Z M 8 4 C 9.664063 4 11 5.335938 11 7 L 11 10.996094 C 11 10.996094 10.988281 11.472656 11.234375 11.96875 C 11.238281 11.980469 11.246094 11.988281 11.25 12 L 4.726563 12 C 4.730469 11.992188 4.738281 11.984375 4.742188 11.980469 C 4.992188 11.488281 5 11.015625 5 11.015625 L 5 7 C 5 5.335938 6.335938 4 8 4 Z"/>
    </svg>
  );
}

PopoverRoot.displayName = "PopoverRoot";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverPositioner.displayName = "PopoverPositioner";
PopoverPopup.displayName = "PopoverPopup";
PopoverArrow.displayName = "PopoverArrow";
PopoverTitle.displayName = "PopoverTitle";
PopoverDescription.displayName = "PopoverDescription";

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  ArrowSvg,
  BellIcon,
};