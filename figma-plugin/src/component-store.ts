import {create} from "zustand";
import {Component} from "@ui-primitives-hub/types";

type ComponentStore = {
  parts?: Component;
  setParts: (parts?: Component) => void;
  colors?: Record<string, string>;
  setColors: (colors?: Record<string, string>) => void;
};

export const useComponentStore = create<ComponentStore>((set) => ({
  setParts: (parts) => {
    set({parts});
  },
  setColors: (colors) => {
    set({colors});
  }
}));
