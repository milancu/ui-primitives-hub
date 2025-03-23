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

type StyleProvider = {
  style?: Style;
  setStyleFromString: (style?: string) => void;
  handleStyle: (key: keyof Style, value: string) => void;
};

const StyleContext = createContext<StyleProvider | undefined>(undefined);

type StyleProviderProps = PropsWithChildren;

export default function StyleProvider({ children }: StyleProviderProps) {
  const [style, setStyle] = useState<Style | undefined>();

  const [currentState] = useCurrentComponentStateParam();
  const [currentPart] = useCurrentPartParam();

  const { states, updateStateStyle, getRawClasses } = useStates();
  const { updatePartStyle } = useComponent();

  const handleStyle = useCallback(
    (key: keyof Style, value: string) => {
      if (!currentState || !style) return;

      const newStyle = { ...style, [key]: value } as Style;
      setStyle(newStyle);

      const tailwind = styleToTailwind(newStyle);
      updateStateStyle(currentState, tailwind);
    },
    [currentState, style, updateStateStyle],
  );

  const setStyleFromString = useCallback((style?: string) => {
    if (style === undefined || style === '') {
      setStyle(undefined);
      return;
    }
    const newStyle = convertStringToStyle(style);
    setStyle(newStyle);
  }, []);

  useEffect(() => {
    if (!states || !currentPart) return;
    updatePartStyle(currentPart, getRawClasses());
  }, [states, currentPart]);

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
