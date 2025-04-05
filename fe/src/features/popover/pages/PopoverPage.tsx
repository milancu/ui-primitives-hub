import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";
import {
  ArrowSvg,
  BellIcon,
  PopoverArrow,
  PopoverDescription,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-primitives-hub/ui/src/components/Popover.tsx";
import { getClassName } from "@/lib/utils.ts";

const PopoverPage = () => {
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

  const { trigger, popup, arrow, title, description } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <PopoverRoot>
          <PopoverTrigger
            className={getClassName(trigger, "trigger" === currentPart)}
          >
            <BellIcon />
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverPositioner sideOffset={8}>
              <PopoverPopup
                className={getClassName(popup, "popup" === currentPart)}
              >
                <PopoverArrow
                  className={getClassName(arrow, "arrow" === currentPart)}
                >
                  <ArrowSvg />
                </PopoverArrow>
                <PopoverTitle
                  className={getClassName(title, "title" === currentPart)}
                >
                  Notifications
                </PopoverTitle>
                <PopoverDescription
                  className={getClassName(
                    description,
                    "description" === currentPart,
                  )}
                >
                  You are all caught up. Good job!
                </PopoverDescription>
              </PopoverPopup>
            </PopoverPositioner>
          </PopoverPortal>
        </PopoverRoot>
      </Preview>
    </div>
  );
};

export default PopoverPage;
