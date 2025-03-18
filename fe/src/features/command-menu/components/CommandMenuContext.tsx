import { createContext, ReactNode, useContext, useState } from "react";

// Definice typu pro kontext
type MenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Vytvoření kontextu s výchozími hodnotami
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Props pro poskytovatele kontextu
type MenuContextProviderProps = {
  children: ReactNode;
};

// Provider komponenta
export function MenuContextProvider({ children }: MenuContextProviderProps) {
  const [open, setOpen] = useState(false);

  const value = {
    open,
    setOpen,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

// Hook pro použití kontextu
export function useMenuContext() {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error(
      "useMenuContext musí být použit uvnitř MenuContextProvider",
    );
  }

  return context;
}
