import { Component } from "@ui-primitives-hub/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type ComponentContext = {
  component?: Component;
  setComponent: (parts?: Component) => void;
  updatePartStyle: (part: keyof Component, raw: string) => void;
};

const ComponentContext = createContext<ComponentContext | undefined>(undefined);

type ComponentProviderProps = PropsWithChildren;

export default function ComponentProvider({
  children,
}: ComponentProviderProps) {
  const [component, setComponent] = useState<Component | undefined>();

  const updatePartStyle = useCallback(
    (part: keyof Component, raw: string) => {
      if (!component) return;

      setComponent({
        ...component,
        [part]: raw,
      });
    },
    [component],
  );

  return (
    <ComponentContext.Provider
      value={{ component, setComponent, updatePartStyle }}
    >
      {children}
    </ComponentContext.Provider>
  );
}

export function useComponent() {
  const context = useContext(ComponentContext);
  if (context === undefined) {
    throw new Error("useComponent must be used within a ComponentProvider");
  }
  return context;
}
