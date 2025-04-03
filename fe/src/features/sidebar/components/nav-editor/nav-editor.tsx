import NavSizeEditor from "@/features/sidebar/components/nav-editor/nav-size-editor.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import NavPaddingEditor from "@/features/sidebar/components/nav-editor/nav-padding-editor.tsx";
import NavMarginEditor from "@/features/sidebar/components/nav-editor/nav-margin-editor.tsx";
import NavLayoutEditor from "@/features/sidebar/components/nav-editor/nav-layout-editor.tsx";
import NavBorderOutlineEditor from "@/features/sidebar/components/nav-editor/nav-border-outline-editor.tsx";
import NavBackgroundEditor from "@/features/sidebar/components/nav-editor/nav-background-editor.tsx";
import NavTextEditor from "@/features/sidebar/components/nav-editor/nav-text-editor.tsx";
import NavOtherPropertiesEditor from "@/features/sidebar/components/nav-editor/nav-other-properties-editor.tsx";
import { useEffect } from "react";
import { useProjectStore } from "@/hooks/store/project-store";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrenStateParam } from "@/features/sidebar/hooks/useCurrenStateParam.tsx";
import { useComponentStore } from "@/hooks/store/component-store.ts";
import { useStyleStore } from "@/hooks/store/style-store.ts";
import { styleToTailwind } from "@ui-primitives-hub/common/src/main.ts";
import { useUpdateStyle } from "@/hooks/mutations/useUpdateStyle.ts";
import { useDebouncedCallback } from "use-debounce";

const NavEditor = () => {
  const projectId = useProjectStore((state) => state.projectId);
  const componentName = useComponentStore((state) => state.componentName);
  const parts = useComponentStore((state) => state.parts);
  const updateStateStyle = useComponentStore((state) => state.updateStateStyle);

  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrenStateParam();

  const style = useStyleStore((state) => state.style);
  const isInitialized = useStyleStore((state) => state.isInitialized);
  const initializeStyle = useStyleStore((state) => state.initializeStyle);

  const { mutate } = useUpdateStyle();

  useEffect(() => {
    if (!parts || !currentPart || !currentState || isInitialized) return;

    const initialStyle = parts[currentPart]?.[currentState] || '';
    initializeStyle(initialStyle);
  }, [parts, currentPart, currentState, isInitialized]);

  const debouncedMutate = useDebouncedCallback(mutate, 1000);

  useEffect(() => {
    if (!isInitialized || !style || !currentPart || !componentName || !currentState || !projectId) return;

    const newTailwind = styleToTailwind(style);
    updateStateStyle(currentPart, currentState, newTailwind);

    debouncedMutate({
      componentName,
      part: currentPart,
      state: currentState,
      projectId,
      tailwind: newTailwind,
    });
  }, [style, currentPart, componentName, currentState, projectId, isInitialized]);

  console.log(style);

  return (
    <>
      <NavLayoutEditor />
      <Separator />
      <NavSizeEditor />
      <Separator />
      <NavPaddingEditor />
      <NavMarginEditor />
      <Separator />
      <NavBorderOutlineEditor />
      <Separator />
      <NavBackgroundEditor />
      <Separator />
      <NavTextEditor />
      <Separator />
      <NavOtherPropertiesEditor />
      <Separator />
    </>
  );
};

export default NavEditor;
