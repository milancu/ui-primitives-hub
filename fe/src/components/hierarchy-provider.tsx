import { ComponentHierarchy } from "@ui-primitives-hub/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type HierarchyContext = {
  hierarchy?: ComponentHierarchy;
  setHierarchy: (hierarchy?: ComponentHierarchy) => void;
};

const HierarchyContext = createContext<HierarchyContext | undefined>(undefined);

type HierarchyProviderProps = PropsWithChildren;

export default function HierarchyProvider({
  children,
}: HierarchyProviderProps) {
  const [hierarchy, setHierarchy] = useState<ComponentHierarchy | undefined>();

  return (
    <HierarchyContext.Provider value={{ hierarchy, setHierarchy }}>
      {children}
    </HierarchyContext.Provider>
  );
}

export function useHierarchy() {
  const context = useContext(HierarchyContext);

  if (context === undefined) {
    throw new Error(
      "useHierarchy must be used within a CurrentComponentProvider",
    );
  }

  return context;
}
