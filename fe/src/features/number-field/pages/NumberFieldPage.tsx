import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import React, { useEffect } from "react";
import {
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "@ui-primitives-hub/ui/src/NumberField.tsx";
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useParts } from "@/hooks/queries/useParts.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";

const NumberFieldPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/number-field",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "number-field");
  const { data: parts } = useParts(id, "number-field");
  const { data: states } = usePartStates(id, currentPart, "number-field");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "number-field",
  );

  useEffect(() => {
    if (!parts) return;
    setComponent(parts);
  }, [parts]);

  useEffect(() => {
    if (!hierarchy) return;
    setHierarchy(hierarchy);
  }, [hierarchy]);

  useEffect(() => {
    if (!states) return;
    setStates(states);
  }, [states]);

  useEffect(() => {
    setStyleFromString(style);
  }, [style]);

  useEffect(() => {
    projectStore.setState(() => id);
    componentStore.setState(() => "number-field");
  }, [id]);

  if (!component)
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
  } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <NumberFieldRoot id={id} defaultValue={100} className={root}>
          <NumberFieldScrubArea className={scrubarea}>
            <label
              htmlFor={id}
              className="cursor-ew-resize text-sm font-medium text-gray-900"
            >
              Amount
            </label>
            <NumberFieldScrubAreaCursor className={scrubareacursor}>
              <CursorGrowIcon />
            </NumberFieldScrubAreaCursor>
          </NumberFieldScrubArea>

          <NumberFieldGroup className={group}>
            <NumberFieldDecrement className={decrement}>
              <MinusIcon />
            </NumberFieldDecrement>
            <NumberFieldInput className={input} />
            <NumberFieldIncrement className={increment}>
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
