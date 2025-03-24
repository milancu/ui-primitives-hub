import Preview from "@/components/preview.tsx";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@ui-primitives-hub/ui/src/Avatar.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useEffect } from "react";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useParts } from "@/hooks/queries/useParts.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";

const AvatarPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/avatar",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "avatar");
  const { data: parts } = useParts(id, "avatar");
  const { data: states } = usePartStates(id, currentPart, "avatar");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "avatar",
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
    console.log('ahojda');
    setStyleFromString(style);
  }, [style]);

  useEffect(() => {
    projectStore.setState(() => id);
    componentStore.setState(() => "avatar");
  }, [id]);

  if (!component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root, image, fallback } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <AvatarRoot className={root}>
          <AvatarImage
            src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
            width="48"
            height="48"
            className={image}
          />
          <AvatarFallback className={fallback}>LT</AvatarFallback>
        </AvatarRoot>
        <AvatarRoot className={root}>LT</AvatarRoot>
      </Preview>
    </div>
  );
};

export default AvatarPage;
