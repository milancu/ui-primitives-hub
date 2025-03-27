import React from "react";
import {cn} from "../lib/utils.ts";

import {Menu as MenuPrimitives} from '@base-ui-components/react/menu';


const MenuRoot = MenuPrimitives.Root


const MenuTrigger = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Trigger>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Trigger
    ref={ref}
    {...props}
    className={cn(className, "__TRIGGER_CLASSNAME__")}
  />
));

const MenuPortal = MenuPrimitives.Portal

const MenuBackdrop = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Backdrop>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Backdrop>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Backdrop
    ref={ref}
    {...props}
    className={cn(className, "__BACKDROP_CLASSNAME__")}
  />
));

const MenuPositioner = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Positioner>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Positioner>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Positioner
    ref={ref}
    {...props}
    className={cn(className, "__POSITIONER_CLASSNAME__")}
  />
));

const MenuPopup = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Popup>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Popup>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Popup
    ref={ref}
    {...props}
    className={cn(className, "__POPUP_CLASSNAME__", "transition-[transform,scale,opacity] dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300")}
  />
))

const MenuArrow = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Arrow>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Arrow>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Arrow
    ref={ref}
    {...props}
    className={cn(className, "__ARROW_CLASSNAME__")}
  />
))

const MenuItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Item>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Item
    ref={ref}
    {...props}
    className={cn(className, "__ITEM_CLASSNAME__")}
  />
))

const MenuSeparator = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Separator>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Separator>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Separator
    ref={ref}
    {...props}
    className={cn(className, "__SEPARATOR_CLASSNAME__")}
  />
))

const MenuGroup = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.Group>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.Group>
>(({className, ...props}, ref) => (
  <MenuPrimitives.Group
    ref={ref}
    {...props}
    className={cn(className, "__GROUP_CLASSNAME__")}
  />
))

const MenuGroupLabel = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.GroupLabel>
>(({className, ...props}, ref) => (
  <MenuPrimitives.GroupLabel
    ref={ref}
    {...props}
    className={cn(className, "__GROUP_LABEL_CLASSNAME__")}
  />
))

const MenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.RadioGroup>
>(({className, ...props}, ref) => (
  <MenuPrimitives.RadioGroup
    ref={ref}
    {...props}
    className={cn(className, "__RADIO_GROUP_CLASSNAME__")}
  />
))

const MenuRadioItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.RadioItem>
>(({className, ...props}, ref) => (
  <MenuPrimitives.RadioItem
    ref={ref}
    {...props}
    className={cn(className, "__RADIO_ITEM_CLASSNAME__")}
  />
))

const MenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenuPrimitives.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenuPrimitives.CheckboxItem>
>(({className, ...props}, ref) => (
  <MenuPrimitives.CheckboxItem
    ref={ref}
    {...props}
    className={cn(className, "__CHECKBOX_ITEM_CLASSNAME__")}
  />
))

MenuTrigger.displayName = "MenuTrigger"
MenuBackdrop.displayName = "MenuBackdrop"
MenuPositioner.displayName = "MenuPositioner"
MenuPopup.displayName = "MenuPopup"
MenuArrow.displayName = "MenuArrow"
MenuItem.displayName = "MenuItem"
MenuSeparator.displayName = "MenuSeparator"
MenuGroup.displayName = "MenuGroup"

export {
  MenuRoot,
  MenuTrigger,
  MenuPortal,
  MenuBackdrop,
  MenuPositioner,
  MenuPopup,
  MenuArrow,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuCheckboxItem,
}