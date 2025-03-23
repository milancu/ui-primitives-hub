import { Component } from "@ui-primitives-hub/types";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { getRawTailwindClasses } from "@ui-primitives-hub/utils/src";

type StatesContext = {
  states?: Component;
  setStates: (states?: Component) => void;
  getRawClasses: () => string;
  updateStateStyle: (part: keyof Component, tailwind: string) => void;
};

const StatesContext = createContext<StatesContext | undefined>(undefined);

type StatesProviderProps = PropsWithChildren;

export default function StatesProvider({ children }: StatesProviderProps) {
  const [states, setStates] = useState<Component | undefined>();

  const updateStateStyle = useCallback(
    (part: keyof Component, tailwind: string) => {
      setStates((prev) => ({
        ...prev,
        [part]: tailwind,
      }));
    },
    [],
  );

  const getRawClasses = useCallback(() => {
    return getRawTailwindClasses(states);
  }, [states]);

  return (
    <StatesContext.Provider
      value={{ states, setStates, getRawClasses, updateStateStyle }}
    >
      {children}
    </StatesContext.Provider>
  );
}

export function useStates() {
  const context = useContext(StatesContext);
  if (context === undefined) {
    throw new Error("useStates must be used within a StatesProvider");
  }
  return context;
}
