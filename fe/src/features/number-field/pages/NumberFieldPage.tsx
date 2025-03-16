import { useCurrentComponent } from "@/components/CurrentComponentProvider.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import React from "react";
import { useNumberFieldStyles } from "@/features/number-field/hooks/queries/useNumberFieldStyles.ts";
import {
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@ui-primitives-hub/ui/src/NumberField.tsx";
import { useUpdateNumberFieldStyle } from "@/features/number-field/hooks/mutations/useUpdateNumberFieldStyle.ts";

const NumberFieldPage = () => {
  const { component, setComponent, setMutation } = useCurrentComponent();
  const mutation = useUpdateNumberFieldStyle();
  const { isLoading, error: errorFetch } = useNumberFieldStyles({
    onDataLoaded: (component) => {
      setComponent(component);
      setMutation(mutation);
    },
  });
  const id = React.useId();

  if (isLoading || !component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );
  if (errorFetch) return <div>Error: {errorFetch.message}</div>;

  const {
    root,
    scrubarea,
    scrubareacursor,
    group,
    decrement,
    input,
    increment,
  } = component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <NumberFieldRoot id={id} defaultValue={100} className={root.raw}>
          <NumberFieldScrubArea className={scrubarea.raw}>
            <label
              htmlFor={id}
              className="cursor-ew-resize text-sm font-medium text-gray-900"
            >
              Amount
            </label>
            <NumberFieldScrubAreaCursor className={scrubareacursor.raw}>
              <CursorGrowIcon />
            </NumberFieldScrubAreaCursor>
          </NumberFieldScrubArea>

          <NumberFieldGroup className={group.raw}>
            <NumberFieldDecrement className={decrement.raw}>
              <MinusIcon />
            </NumberFieldDecrement>
            <NumberFieldInput className={input.raw} />
            <NumberFieldIncrement className={increment.raw}>
              <PlusIcon />
            </NumberFieldIncrement>
          </NumberFieldGroup>
        </NumberFieldRoot>
      </Preview>
    </div>
  );
};

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}

export default NumberFieldPage;
