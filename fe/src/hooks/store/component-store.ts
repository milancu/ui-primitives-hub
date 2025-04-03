import { create } from "zustand";
import { Component } from "@ui-primitives-hub/types";

type ComponentStore = {
  componentName?: string;
  setComponentName: (componentName?: string) => void;
  parts?: Component;
  setParts: (parts?: Component) => void;
  updateStateStyle: (part: string, state: string, style: string) => void;
};

export const useComponentStore = create<ComponentStore>((set) => ({
  setComponentName: (componentName) => set({ componentName }),
  setParts: (parts) => {
    set({ parts });
  },
  updateStateStyle: (part, stateToUpdate, style) => {
    set((state) => ({
      parts: {
        ...(state.parts || {}),
        [part]: {
          ...(state.parts?.[part] || {}),
          [stateToUpdate]: style,
        },
      },
    }));
  },
}));
