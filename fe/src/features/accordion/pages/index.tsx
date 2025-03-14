import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@ui-primitives-hub/ui/src";
import { useAccordionStyles } from "@/features/accordion/hooks/queries/useAccordionStyles.ts";
import { useCurrentComponent } from "@/components/CurrentComponentProvider";
import Preview from "@/components/preview.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

const AccordionPage = () => {
  const { component, setComponent } = useCurrentComponent();
  const { isLoading, error } = useAccordionStyles({
    onDataLoaded: setComponent
  });

  if (isLoading || !component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  const { root, item, header, trigger, panel } = component.parts;

  return (
    <div className="h-full w-full">
      <Preview>
        <AccordionRoot className={root.raw}>
          <AccordionItem className={item.raw}>
            <AccordionHeader className={header.raw}>
              <AccordionTrigger className={trigger.raw}>
                Hello, this is accordion
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel className={panel.raw}>
              You can add any content here.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem className={item.raw}>
            <AccordionHeader className={header.raw}>
              <AccordionTrigger className={trigger.raw}>
                Hello, this is accordion
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel className={panel.raw}>
              You can add any content here.
            </AccordionPanel>
          </AccordionItem>
        </AccordionRoot>
      </Preview>
    </div>
  );
};

export default AccordionPage;
