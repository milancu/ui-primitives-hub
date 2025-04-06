import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/features/preview/components/preview.tsx";
import React from "react";
import {
  MenuArrow,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@ui-primitives-hub/ui/src/components/Menu.tsx";
import { useCurrentPartParam } from "@/hooks/use-current-part-param.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { getClassName } from "@/lib/utils.ts";
import { getRawTailwindClasses } from "@ui-primitives-hub/common/src/main.ts";

const MenuPage = () => {
  const [currentPart] = useCurrentPartParam();
  const parts = useComponentStore((state) => state.parts);

  if (!parts)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const tailwind = Object.keys(parts).reduce(
    (acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(parts[key]);
      return acc;
    },
    {},
  );

  const { trigger, positioner, popup, arrow, item, separator } = tailwind;

  return (
    <div className="h-full w-full">
      <Preview>
        <MenuRoot>
          <MenuTrigger
            className={getClassName(trigger, "trigger" === currentPart)}
          >
            Song <ChevronDownIcon className="-mr-1" />
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner
              className={getClassName(positioner, "positioner" === currentPart)}
              sideOffset={8}
            >
              <MenuPopup
                className={getClassName(popup, "popup" === currentPart)}
              >
                <MenuArrow
                  className={getClassName(arrow, "arrow" === currentPart)}
                >
                  <ArrowSvg />
                </MenuArrow>
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Add to Library
                </MenuItem>
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Add to Playlist
                </MenuItem>
                <MenuSeparator
                  className={getClassName(
                    separator,
                    "separator" === currentPart,
                  )}
                />
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Play Next
                </MenuItem>
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Play Last
                </MenuItem>
                <MenuSeparator
                  className={getClassName(
                    separator,
                    "separator" === currentPart,
                  )}
                />
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Favorite
                </MenuItem>
                <MenuItem
                  className={getClassName(item, "item" === currentPart)}
                >
                  Share
                </MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </MenuRoot>
      </Preview>
    </div>
  );
};

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-[canvas]"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-gray-200 dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-gray-300"
      />
    </svg>
  );
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}

export default MenuPage;
