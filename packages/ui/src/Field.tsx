import React from "react";
import {cn} from "./lib/utils.ts";
import {Field as FieldPrimitives} from '@base-ui-components/react/field';

const FieldRoot = React.forwardRef<
  React.ElementRef<typeof FieldPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Root>
>(({className, ...props}, ref) => (
  <FieldPrimitives.Root
    ref={ref}
    {...props}
    className={cn(className, "__ROOT_CLASSNAME__")}
  />
));

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof FieldPrimitives.Label>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Label>
>(({className, ...props}, ref) => (
  <FieldPrimitives.Label
    ref={ref}
    {...props}
    className={cn(className, "__LABEL_CLASSNAME__")}
  />
))

const FieldControl = React.forwardRef<
  React.ElementRef<typeof FieldPrimitives.Control>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Control>
>(({className, ...props}, ref) => (
  <FieldPrimitives.Control
    ref={ref}
    {...props}
    className={cn(className, "__CONTROL_CLASSNAME__")}
  />
))

const FieldDescription = React.forwardRef<
  React.ElementRef<typeof FieldPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Description>
>(({className, ...props}, ref) => (
  <FieldPrimitives.Description
    ref={ref}
    {...props}
    className={cn(className, "__DESCRIPTION_CLASSNAME__")}
  />
))

const FieldError = React.forwardRef<
  React.ElementRef<typeof FieldPrimitives.Error>,
  React.ComponentPropsWithoutRef<typeof FieldPrimitives.Error>
>(({className, ...props}, ref) => (
  <FieldPrimitives.Error
    ref={ref}
    {...props}
    className={cn(className, "__ERROR_CLASSNAME__")}
  />
))

const FieldValidity = FieldPrimitives.Validity

FieldRoot.displayName = "FieldRoot"
FieldLabel.displayName = "FieldLabel"
FieldControl.displayName = "FieldControl"
FieldDescription.displayName = "FieldDescription"
FieldError.displayName = "FieldError"
FieldValidity.displayName = "FieldValidity"

export {
  FieldRoot,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldValidity,
}