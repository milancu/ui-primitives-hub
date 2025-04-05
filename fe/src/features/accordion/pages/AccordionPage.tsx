import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@ui-primitives-hub/ui/src/components/Accordion.tsx";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { getClassName } from "@/lib/utils.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";

const AccordionPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className="flex h-full w-full flex-col items-center gap-2 p-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    );

  const tailwind = Object.keys(parts).reduce(
    (acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(parts[key]);
      return acc;
    },
    {},
  );

  const { root, item, header, trigger, panel } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <AccordionRoot className={getClassName(root, "root" === currentPart)}>
          {[
            {
              question: "What is Base UI?",
              answer:
                "Base UI is a library of high-quality unstyled React components for design systems and web apps.",
            },
            {
              question: "How do I get started?",
              answer:
                "Head to the “Quick start” guide in the docs. If you’ve used unstyled libraries before, you’ll feel at home.",
            },
            {
              question: "Can I use it for my project?",
              answer: "Of course! Base UI is free and open source.",
            },
          ].map(({ question, answer }, index) => (
            <AccordionItem
              key={index}
              className={getClassName(item, "item" === currentPart)}
            >
              <AccordionHeader
                className={getClassName(header, "header" === currentPart)}
              >
                <AccordionTrigger
                  className={getClassName(trigger, "trigger" === currentPart)}
                >
                  {question}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionPanel
                className={getClassName(panel, "panel" === currentPart)}
              >
                {answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Preview>
    </div>
  );
};

export default AccordionPage;
