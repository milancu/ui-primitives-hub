import { Component } from "@ui-primitives-hub/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CurrentComponentContext = {
  component?: Component;
  setComponent: (component: Component) => void;
};

const CurrentComponentContext = createContext<
  CurrentComponentContext | undefined
>(undefined);

type CurrentComponentProviderProps = PropsWithChildren;

export default function CurrentComponentProvider({
  children,
}: CurrentComponentProviderProps) {
  const [component, setComponent] = useState<Component>();
  return (
    <CurrentComponentContext.Provider
      value={{
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
