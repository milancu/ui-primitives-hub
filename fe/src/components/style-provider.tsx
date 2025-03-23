import { Style } from "@ui-primitives-hub/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  convertStringToStyle,
  styleToTailwind,
} from "@ui-primitives-hub/utils/src";
import { useStates } from "@/components/states-provider.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useUpdateStyle } from "@/hooks/mutations/useUpdateStyle.ts";
import { useStore } from "@tanstack/react-store";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";

type StyleProvider = {
  style?: Style;
  setStyleFromString: (style?: string) => void;
  handleStyle: (key: keyof Style, value: string) => void;
};

const StyleContext = createContext<StyleProvider | undefined>(undefined);

type StyleProviderProps = PropsWithChildren;

export default function StyleProvider({ children }: StyleProviderProps) {
  const [style, setStyle] = useState<Style | undefined>();
  const [tailwind, setTailwind] = useState<string | undefined>();
  const id = useStore(projectStore);
  const component = useStore(componentStore);

  const [currentState] = useCurrentComponentStateParam();
  const [currentPart] = useCurrentPartParam();

  const { states, updateStateStyle, getRawClasses } = useStates();
  const { updatePartStyle } = useComponent();

  const { mutate } = useUpdateStyle("accordion");

  const handleStyle = useCallback(
    (key: keyof Style, value: string) => {
      if (!currentState || !style) return;

      const newStyle = { ...style, [key]: value } as Style;
      setStyle(newStyle);

      const tailwind = styleToTailwind(newStyle);
      setTailwind(tailwind);
      updateStateStyle(currentState, tailwind);
    },
    [currentState, style, updateStateStyle],
  );

  const setStyleFromString = useCallback((style?: string) => {
    if (style === undefined || style === "") {
      setStyle(undefined);
      return;
    }
    const newStyle = convertStringToStyle(style);
    setStyle(newStyle);
  }, []);

  const saveStyle = useCallback(() => {
    if (
      !currentState ||
      !currentPart ||
      !style ||
      !tailwind ||
      !id ||
      !component
    )
      return;

    mutate({
      componentName: component,
      part: currentPart,
      state: currentState,
      projectId: id,
      tailwind: tailwind,
    });
  }, [currentPart, currentState, id, mutate, style, tailwind, component]);

  useEffect(() => {
    if (!states || !currentPart) return;
    updatePartStyle(currentPart, getRawClasses());
  }, [states, currentPart]);

  useEffect(() => {
    if (!states || !currentPart) return;

    const timeoutId = setTimeout(() => {
      saveStyle();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [states, currentPart, saveStyle]);

  return (
    <StyleContext.Provider value={{ style, setStyleFromString, handleStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    throw new Error("useStyle must be used within a StyleProvider");
  }
  return context;
}
