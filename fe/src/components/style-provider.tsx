import { Style } from "@ui-primitives-hub/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStates } from "@/components/states-provider.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useComponent } from "@/components/component-provider.tsx";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useUpdateStyle } from "@/hooks/mutations/useUpdateStyle.ts";
import { useStore } from "@tanstack/react-store";
import { projectStore } from "@/store/project.store.ts";
import { componentStore } from "@/store/component.store.ts";
import {
  convertStringToStyle,
  styleToTailwind,
} from "@ui-primitives-hub/common";

type StyleProvider = {
  style?: Style;
  setStyleFromString: (style?: string) => void;
  setStyle: (style?: Style) => void;
  handleStyle: (key: keyof Style, value: string) => void;
};

const StyleContext = createContext<StyleProvider | undefined>(undefined);

type StyleProviderProps = PropsWithChildren;

export default function StyleProvider({ children }: StyleProviderProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [style, setStyle] = useState<Style | undefined>();

  const id = useStore(projectStore);
  const component = useStore(componentStore);

  const [currentState] = useCurrentComponentStateParam();
  const [currentPart] = useCurrentPartParam();

  const { states, updateStateStyle, getRawClasses } = useStates();
  const { updatePartStyle } = useComponent();

  const { mutate } = useUpdateStyle();


  const handleStyle = useCallback(
    (key: keyof Style, value: string) => {
      if (!style && value) {
        const newStyle = { [key]: value };
        setStyle(newStyle);
      }

      if (!currentState || !style) return;

      const newStyle = { ...style, [key]: value } as Style;
      setStyle(newStyle);

      const tailwind = styleToTailwind(newStyle);
      console.log(newStyle,tailwind);
      updateStateStyle(currentState, tailwind);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        saveStyle(tailwind);
      }, 500);
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

  const saveStyle = useCallback(
    (tailwindToSave: string) => {
      if (
        !currentState ||
        !currentPart ||
        !style ||
        !tailwindToSave ||
        !id ||
        !component
      )
        return;

      mutate({
        componentName: component,
        part: currentPart,
        state: currentState,
        projectId: id,
        tailwind: tailwindToSave,
      });
    },
    [currentPart, currentState, id, mutate, style, component],
  );

  useEffect(() => {
    if (!states || !currentPart) return;
    updatePartStyle(currentPart, getRawClasses());
  }, [states, currentPart]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <StyleContext.Provider
      value={{ style, setStyleFromString, handleStyle, setStyle }}
    >
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
