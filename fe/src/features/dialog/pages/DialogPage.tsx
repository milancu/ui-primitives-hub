import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@ui-primitives-hub/ui/src/Dialog.tsx";
import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useParts } from "@/hooks/queries/useParts.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";

const DialogPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/dialog",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "dialog");
  const { data: parts } = useParts(id, "dialog");
  const { data: states } = usePartStates(id, currentPart, "dialog");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "dialog",
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
    componentStore.setState(() => "dialog");
  }, [id]);

  if (!component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { trigger, backdrop, popup, title, description, close } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <DialogRoot>
          <DialogTrigger className={trigger}>View notifications</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className={backdrop} />
            <DialogPopup className={popup}>
              <DialogTitle className={title}>Notifications</DialogTitle>
              <DialogDescription className={description}>
                You are all caught up. Good job!
              </DialogDescription>
              <div className="flex justify-end gap-4">
                <DialogClose className={close}>Close</DialogClose>
              </div>
            </DialogPopup>
          </DialogPortal>
        </DialogRoot>
      </Preview>
    </div>
  );
};

export default DialogPage;
