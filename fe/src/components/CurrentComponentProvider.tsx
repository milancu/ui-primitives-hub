import { Component, Style } from "@ui-primitives-hub/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { convertStringToStyle } from "@ui-primitives-hub/utils/src";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";

type CurrentComponentContext = {
  component?: Component;
  setComponent: (component: Component) => void;
  currentStyle?: Style;
  setCurrentStyle: (style: Style) => void;
};

const CurrentComponentContext = createContext<
  CurrentComponentContext | undefined
>(undefined);

type CurrentComponentProviderProps = PropsWithChildren;

export default function CurrentComponentProvider({
  children,
}: CurrentComponentProviderProps) {
  const [component, setComponent] = useState<Component>();
  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();
  const [currentStyle, setCurrentStyle] = useState<Style>();

  useEffect(() => {
    if (!component || !currentPart) return;
    const currentStyle = component?.parts[currentPart]?.attributes;
    const style = convertStringToStyle(currentStyle[currentState]);
    setCurrentStyle(style);
  }, [component, currentPart, currentState]);

  return (
    <CurrentComponentContext.Provider
      value={{
        currentStyle,
        setCurrentStyle,
        component,
        setComponent,
      }}
    >
      {children}
    </CurrentComponentContext.Provider>
  );
}

export function useCurrentComponent() {
  const context = useContext(CurrentComponentContext);

  if (context === undefined) {
    throw new Error(
      "useCurrentComponent must be used within a CurrentComponentProvider",
    );
  }

  return context;
}
