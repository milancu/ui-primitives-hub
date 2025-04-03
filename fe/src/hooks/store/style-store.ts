import { Style } from "@ui-primitives-hub/types";
import { create } from "zustand";
import { convertStringToStyle } from "@ui-primitives-hub/common/src/main.ts";

type StyleStore = {
  style?: Style;
  initialValue?: Style;
  isInitialized: boolean;
  setStyle: (style?: Style) => void;
  initializeStyle: (styleAsString?: string) => void;
  handleStyle: (key: keyof Style, value: string) => void;
  reset: () => void;
};

export const useStyleStore = create<StyleStore>((set) => ({
  isInitialized: false,
  setStyle: (style) => set({ style }),
  initializeStyle: (styleAsString) => {
    if (!styleAsString) {
      set({ initialValue: {}, isInitialized: true });
      return;
    }
    const newStyle = convertStringToStyle(styleAsString);
    set({ initialValue: newStyle, style: newStyle, isInitialized: true });
  },
  handleStyle: (key, value) => {
    set((state) => ({
      style: { ...(state.style || {}), [key]: value },
    }));
  },
  reset: () => set({ style: undefined, initialValue: undefined, isInitialized: false }),
}));