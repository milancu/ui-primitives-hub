import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@ui-primitives-hub/ui/src";
import { useAccordionStyles } from "@/features/accordion/hooks/queries/useAccordionStyles.ts";

const AccordionPage = () => {
  const { data, isLoading, error } = useAccordionStyles();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { root, item, header, trigger, panel } = data;

  return (
    <div>
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
    </div>
  );
};

export default AccordionPage;
