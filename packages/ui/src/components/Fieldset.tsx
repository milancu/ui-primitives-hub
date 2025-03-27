import React from "react";
import {cn} from "../lib/utils.ts";
import {Fieldset as FieldsetPrimitives} from '@base-ui-components/react/fieldset';


const FieldsetRoot = React.forwardRef<
  React.ElementRef<typeof FieldsetPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof FieldsetPrimitives.Root>
>(({className, ...props}, ref) => (
  <FieldsetPrimitives.Root
    ref={ref}
    {...props}
    className={cn(className, "__ROOT_CLASSNAME__")}
  />
));

const FieldsetLegend = React.forwardRef<
  React.ElementRef<typeof FieldsetPrimitives.Legend>,
  React.ComponentPropsWithoutRef<typeof FieldsetPrimitives.Legend>
>(({className, ...props}, ref) => (
  <FieldsetPrimitives.Legend
    ref={ref}
    {...props}
    className={cn(className, "__LEGEND_CLASSNAME__")}
  />
))

FieldsetRoot.displayName = "FieldsetRoot"
FieldsetLegend.displayName = "FieldsetLegend"

export {
  FieldsetRoot,
  FieldsetLegend,
}