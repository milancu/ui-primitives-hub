import { Style } from "@ui-primitives-hub/types";
import { create } from "zustand";
import { convertStringToStyle } from "@ui-primitives-hub/common/src/main.ts";

type StyleStore = {
  style?: Style;
  setStyle: (style?: Style) => void;
  initializeStyle: (styleAsString?: string) => void;
  handleStyle: (key: keyof Style, value: string) => void;
};

export const useStyleStore = create<StyleStore>((set) => ({
  isInitialized: false,
  setStyle: (style) => set({ style }),
  initializeStyle: (styleAsString) => {
    if (!styleAsString) {
      set({ style: {} });
      return;
    }
    const newStyle = convertStringToStyle(styleAsString);
    set({ style: newStyle });
  },
  handleStyle: (key, value) => {
    set((state) => ({
      style: { ...(state.style || {}), [key]: value },
    }));
  },
}));
