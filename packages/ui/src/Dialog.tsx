import {Dialog as DialogPrimitives} from '@base-ui-components/react/dialog';
import {cn} from "./lib/utils.ts";
import React from "react";

const DialogRoot = DialogPrimitives.Root

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Trigger>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Trigger
    ref={ref}
    {...props}
    className={cn(className, "__TRIGGER_CLASSNAME__")}
  />
))

const DialogPortal = DialogPrimitives.Portal

const DialogBackdrop = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Backdrop>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Backdrop>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Backdrop
    ref={ref}
    {...props}
    className={cn(className, "__BACKDROP_CLASSNAME__", "transition-all")}
  />
))

const DialogPopup = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Popup>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Popup>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Popup
    ref={ref}
    {...props}
    className={cn(className, "__POPUP_CLASSNAME__", "-translate-x-1/2 -translate-y-1/2")}
  />
))

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Title>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Title
    ref={ref}
    {...props}
    className={cn(className, "__TITLE_CLASSNAME__")}
  />
))

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Description>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Description
    ref={ref}
    {...props}
    className={cn(className, "__DESCRIPTION_CLASSNAME__")}
  />
))

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitives.Close>
>(({className, ...props}, ref) => (
  <DialogPrimitives.Close
    ref={ref}
    {...props}
    className={cn(className, "__CLOSE_CLASSNAME__")}
  />
))

DialogTrigger.displayName = "DialogTrigger"
DialogBackdrop.displayName = "DialogBackdrop"
DialogPopup.displayName = "DialogPopup"
DialogTitle.displayName = "DialogTitle"
DialogDescription.displayName = "DialogDescription"
DialogClose.displayName = "DialogClose"

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogTitle,
  DialogDescription,
}


