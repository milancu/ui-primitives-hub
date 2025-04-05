import { Skeleton } from "@/components/ui/skeleton";
import Preview from "@/features/preview/components/preview.tsx";
import { useCurrentPartParam } from "@/hooks/useCurrentPartParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";
import {
  CheckIcon,
  ChevronUpDownIcon,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  SelectValue,
} from "@ui-primitives-hub/ui/src/components/Select.tsx";
import { getClassName } from "@/lib/utils.ts";

const SelectPage = () => {
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

  const {
    trigger,
    icon,
    positioner,
    scrollUpArrow,
    popup,
    item,
    itemIndicator,
    itemText,
    value,
  } = tailwind;

  const items = [
    {
      value: "sans",
      label: "Sans-serif",
    },
    {
      value: "mono",
      label: "Monospace",
    },
    {
      value: "cursive",
      label: "Cursive",
    },
  ];

  return (
    <div className="h-full w-full">
      <Preview>
        <SelectRoot defaultValue="sans">
          <SelectTrigger
            className={getClassName(trigger, "trigger" === currentPart)}
          >
            <SelectValue
              placeholder="Sans-serif"
              className={getClassName(value, "value" === currentPart)}
            />
            <SelectIcon className={getClassName(icon, "icon" === currentPart)}>
              <ChevronUpDownIcon />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectPositioner
              sideOffset={8}
              className={getClassName(positioner, "positioner" === currentPart)}
            >
              <SelectScrollUpArrow
                className={getClassName(
                  scrollUpArrow,
                  "scrollUpArrow" === currentPart,
                )}
              />
              <SelectPopup
                className={getClassName(popup, "popup" === currentPart)}
              >
                {items.map((itemSelect, index) => (
                  <SelectItem
                    key={index}
                    value={itemSelect.value}
                    className={getClassName(item, "item" === currentPart)}
                  >
                    <SelectItemIndicator
                      className={getClassName(
                        itemIndicator,
                        "itemIndicator" === currentPart,
                      )}
                    >
                      <CheckIcon className="size-3" />
                    </SelectItemIndicator>
                    <SelectItemText
                      className={getClassName(
                        itemText,
                        "itemText" === currentPart,
                      )}
                    >
                      {itemSelect.label}
                    </SelectItemText>
                  </SelectItem>
                ))}
              </SelectPopup>
              <SelectScrollDownArrow />
            </SelectPositioner>
          </SelectPortal>
        </SelectRoot>
      </Preview>
    </div>
  );
};

export default SelectPage;
