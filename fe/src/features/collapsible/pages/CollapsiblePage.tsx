import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import { useCurrentPartParam } from "@/hooks/use-current-part-param.tsx";
import { getClassName } from "@/lib/utils.ts";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";
import {
  ChevronIcon,
  CollapsiblePanel,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "@ui-primitives-hub/ui/src/components/Collapsible.tsx";

const CollapsiblePage = () => {
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

  const { root, trigger, panel } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <CollapsibleRoot className={getClassName(root, "root" === currentPart)}>
          <CollapsibleTrigger
            className={getClassName(trigger, "trigger" === currentPart)}
          >
            <ChevronIcon className="group-data-[panel-open]:rotate-90" />
            Recovery keys
          </CollapsibleTrigger>
          <CollapsiblePanel
            className={getClassName(panel, "panel" === currentPart)}
          >
            <div className="mt-1 flex cursor-text flex-col gap-2 rounded-sm py-2 pl-7">
              <div>alien-bean-pasta</div>
              <div>wild-irish-burrito</div>
              <div>horse-battery-staple</div>
            </div>
          </CollapsiblePanel>
        </CollapsibleRoot>
      </Preview>
    </div>
  );
};

export default CollapsiblePage;
