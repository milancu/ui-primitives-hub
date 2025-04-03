import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import React from "react";
import {
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@ui-primitives-hub/ui/src/components/NumberField.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";

const NumberFieldPage = () => {
  const id = "number-field";
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const {
    root,
    scrubarea,
    scrubareacursor,
    group,
    decrement,
    input,
    increment,
  } = parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <NumberFieldRoot
          id={id}
          defaultValue={100}
          className={getClassName(root, "root" === currentPart)}
        >
          <NumberFieldScrubArea
            className={getClassName(scrubarea, "scrubarea" === currentPart)}
          >
            <label
              htmlFor={id}
              className="cursor-ew-resize text-sm font-medium text-gray-900"
            >
              Amount
            </label>
            <NumberFieldScrubAreaCursor
              className={getClassName(
                scrubareacursor,
                "scrubareacursor" === currentPart,
              )}
            >
              <CursorGrowIcon />
            </NumberFieldScrubAreaCursor>
          </NumberFieldScrubArea>

          <NumberFieldGroup
            className={getClassName(group, "group" === currentPart)}
          >
            <NumberFieldDecrement
              className={getClassName(decrement, "decrement" === currentPart)}
            >
              <MinusIcon />
            </NumberFieldDecrement>
            <NumberFieldInput
              className={getClassName(input, "input" === currentPart)}
            />
            <NumberFieldIncrement
              className={getClassName(increment, "increment" === currentPart)}
            >
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
