import { Skeleton } from "@/components/ui/skeleton.tsx";
import Preview from "@/components/preview.tsx";
import React, { useEffect } from "react";
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
import { useParams } from "@tanstack/react-router";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useHierarchy } from "@/components/hierarchy-provider.tsx";
import { useStates } from "@/components/states-provider.tsx";
import { useStyle } from "@/components/style-provider.tsx";
import { useComponentHierarchy } from "@/hooks/queries/useComponentHierarchy.ts";
import { useParts } from "@/hooks/queries/useParts.ts";
import { usePartStates } from "@/hooks/queries/usePartStates.ts";
import { usePartStateStyle } from "@/hooks/queries/usePartStateStyle.ts";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";

const MenuPage = () => {
  const { id } = useParams({
    from: "/_authenticated/_canva-layout/$id/menu",
  });

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const { component, setComponent } = useComponent();
  const { setHierarchy } = useHierarchy();
  const { setStates } = useStates();
  const { setStyleFromString } = useStyle();

  const { data: hierarchy } = useComponentHierarchy(id, "menu");
  const { data: parts } = useParts(id, "menu");
  const { data: states } = usePartStates(id, currentPart, "menu");
  const { data: style } = usePartStateStyle(
    id,
    currentPart,
    currentState,
    "menu",
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
    componentStore.setState(() => "menu");
  }, [id]);

  if (!component)
    return (
      <div className={"flex h-full w-full flex-col items-center gap-2 p-2"}>
        <Skeleton className={"h-full w-full"} />
        <Skeleton className={"h-full w-full"} />
      </div>
    );

  const { trigger, positioner, popup, arrow, item, separator } = component;

  return (
    <div className="h-full w-full">
      <Preview>
        <MenuRoot>
          <MenuTrigger className={trigger}>
            Song <ChevronDownIcon className="-mr-1" />
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner className={positioner} sideOffset={8}>
              <MenuPopup className={popup}>
                <MenuArrow className={arrow}>
                  <ArrowSvg />
                </MenuArrow>
                <MenuItem className={item}>Add to Library</MenuItem>
                <MenuItem className={item}>Add to Playlist</MenuItem>
                <MenuSeparator className={separator} />
                <MenuItem className={item}>Play Next</MenuItem>
                <MenuItem className={item}>Play Last</MenuItem>
                <MenuSeparator className={separator} />
                <MenuItem className={item}>Favorite</MenuItem>
                <MenuItem className={item}>Share</MenuItem>
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
