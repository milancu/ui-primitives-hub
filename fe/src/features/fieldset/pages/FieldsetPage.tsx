import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import {
  FieldControl,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/Field.tsx";
import {
  FieldsetLegend,
  FieldsetRoot,
} from "@ui-primitives-hub/ui/src/Fieldset.tsx";
import { useParts } from "@/hooks/queries/useParts.ts";
import { useParams } from "@tanstack/react-router";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useEffect } from "react";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";

const FieldsetPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/fieldset",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: field } = useParts(id, "field");
  const { data: hierarchy } = useComponentHierarchy(id, "fieldset");
  const { data: parts } = useParts(id, "fieldset");
  const { data: states } = usePartStates(id, currentPart, "fieldset");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "fieldset",
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
    componentStore.setState(() => "fieldset");
  }, [id]);

  if (!component || !field)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root: fieldRoot, label, control } = field;
  const { root: fieldsetRoot, legend } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldsetRoot className={fieldsetRoot}>
          <FieldsetLegend className={legend}>Billing details</FieldsetLegend>

          <FieldRoot className={fieldRoot}>
            <FieldLabel className={label}>Name</FieldLabel>
            Company
            <FieldControl
              placeholder="Enter company name"
              className={control}
            />
          </FieldRoot>

          <FieldRoot className={fieldRoot}>
            <FieldLabel className={label}>Name</FieldLabel>
            Tax ID
            <FieldControl
              placeholder="Enter fiscal number"
              className={control}
            />
          </FieldRoot>
        </FieldsetRoot>
      </Preview>
    </div>
  );
};

export default FieldsetPage;
