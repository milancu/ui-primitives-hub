import { useParams } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
  PlusIcon,
} from "@ui-primitives-hub/ui/src/components/Accordion.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useEffect } from "react";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useComponent } from "@/components/component-provider";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useParts } from "@/hooks/queries/useParts.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle";

const AccordionPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/accordion",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "accordion");
  const { data: parts } = useParts(id, "accordion");
  const { data: states } = usePartStates(id, currentPart, "accordion");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "accordion",
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
    componentStore.setState(() => "accordion");
  }, [id]);

  if (!component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { root, item, header, trigger, panel } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <AccordionRoot className={root}>
          <AccordionItem className={item}>
            <AccordionHeader className={header}>
              <AccordionTrigger className={trigger}>
                What is Base UI?
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel className={panel}>
              Base UI is a library of high-quality unstyled React components for design
              systems and web apps.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className={item}>
            <AccordionHeader className={header}>
              <AccordionTrigger className={trigger}>
                How do I get started?
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel className={panel}>
              Head to the “Quick start” guide in the docs. If you’ve used unstyled
              libraries before, you’ll feel at home.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className={item}>
            <AccordionHeader className={header}>
              <AccordionTrigger className={trigger}>
                Can I use it for my project?
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel className={panel}>
              Of course! Base UI is free and open source.
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Preview>
    </div>
  );
};

export default AccordionPage;
