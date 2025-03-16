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
import {  UseMutationResult } from "@tanstack/react-query";

type CurrentComponentContext = {
  component?: Component;
  setComponent: (component?: Component) => void;
  currentStyle?: Style;
  setCurrentStyle: (style: Style) => void;
  mutation?: UseMutationResult<any, Error, any, unknown>;
  setMutation: (mutate: UseMutationResult<any, Error, any, unknown>) => void;
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
  const [mutation, setMutation] = useState<UseMutationResult<any, Error, any, unknown>>();

  useEffect(() => {
    if (!component || !currentPart) return;
    const currentStyle = component?.parts[currentPart]?.attributes;
    if (!currentStyle) return;
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
        mutation,
        setMutation,
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
