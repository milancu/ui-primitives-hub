import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import {
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldRoot,
} from "@ui-primitives-hub/ui/src/components/Field.tsx";
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useEffect } from "react";
import { useParts } from "@/hooks/queries/useParts.ts";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";

const FieldPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/field",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "field");
  const { data: parts } = useParts(id, "field");
  const { data: states } = usePartStates(id, currentPart, "field");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "field",
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
    componentStore.setState(() => "field");
  }, [id]);

  if (!component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root, label, control, error, description } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <FieldRoot className={root}>
          <FieldLabel className={label}>Name</FieldLabel>
          <FieldControl required placeholder="Required" className={control} />
          <FieldError className={error} match="valueMissing">
            Please enter your name
          </FieldError>

          <FieldDescription className={description}>
            Visible on your profile
          </FieldDescription>
        </FieldRoot>
      </Preview>
    </div>
  );
};

export default FieldPage;
