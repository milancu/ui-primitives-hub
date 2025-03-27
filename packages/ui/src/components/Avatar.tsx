import {Avatar as AvatarPrimitives} from '@base-ui-components/react/avatar';
import React from "react";
import {cn} from "../lib/utils.ts";

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Root>
>(({className, ...props}, ref) => (
  <AvatarPrimitives.Root
    ref={ref}
    {...props}
    className={cn(className, "__ROOT_CLASSNAME__")}
  />
));

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Image>
>(({className, ...props}, ref) => (
  <AvatarPrimitives.Image
    ref={ref}
    {...props}
    className={cn(className, "__IMAGE_CLASSNAME__")}
  />
));

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitives.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitives.Fallback>
>(({className, ...props}, ref) => (
  <AvatarPrimitives.Fallback
    ref={ref}
    {...props}
    className={cn(className, "__FALLBACK_CLASSNAME__")}
  />
));

AvatarRoot.displayName = "AvatarRoot";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export {
  AvatarRoot,
  AvatarImage,
  AvatarFallback,
};