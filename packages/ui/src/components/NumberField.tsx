import React from "react";
import {cn} from "../lib/utils.ts";
import {NumberField as NumberFieldPrimitives} from '@base-ui-components/react/number-field';


const NumberFieldRoot = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Root>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.Root
    ref={ref}
    {...props}
    className={cn(className, "__ROOT_CLASSNAME__")}
  />
));

const NumberFieldScrubArea = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.ScrubArea>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.ScrubArea>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.ScrubArea
    ref={ref}
    {...props}
    className={cn(className, "__SCRUBAREA_CLASSNAME__")}
  />
));

const NumberFieldScrubAreaCursor = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.ScrubAreaCursor>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.ScrubAreaCursor>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.ScrubAreaCursor
    ref={ref}
    {...props}
    className={cn(className, "__SCRUBAREA_CURSOR_CLASSNAME__")}
  />
))

const NumberFieldGroup = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.Group>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Group>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.Group
    ref={ref}
    {...props}
    className={cn(className, "__GROUP_CLASSNAME__")}
  />
))

const NumberFieldInput = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.Input>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Input>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.Input
    ref={ref}
    {...props}
    className={cn(className, "__INPUT_CLASSNAME__")}
  />
))

const NumberFieldDecrement = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.Decrement>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Decrement>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.Decrement
    ref={ref}
    {...props}
    className={cn(className, "__DECREMENT_CLASSNAME__")}
  />
))

const NumberFieldIncrement = React.forwardRef<
  React.ElementRef<typeof NumberFieldPrimitives.Increment>,
  React.ComponentPropsWithoutRef<typeof NumberFieldPrimitives.Increment>
>(({className, ...props}, ref) => (
  <NumberFieldPrimitives.Increment
    ref={ref}
    {...props}
    className={cn(className, "__INCREMENT_CLASSNAME__")}
  />
))

NumberFieldRoot.displayName = "NumberFieldRoot"
NumberFieldScrubArea.displayName = "NumberFieldScrubArea"
NumberFieldScrubAreaCursor.displayName = "NumberFieldScrubAreaCursor"
NumberFieldGroup.displayName = "NumberFieldGroup"
NumberFieldInput.displayName = "NumberFieldInput"
NumberFieldDecrement.displayName = "NumberFieldDecrement"
NumberFieldIncrement.displayName = "NumberFieldIncrement"

export {
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
}
