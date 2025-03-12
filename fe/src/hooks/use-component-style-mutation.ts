import { useUpdateAccordionStyle } from "@/features/accordion/hooks/mutations/useUpdateAccordionStyle";
import { useCurrentComponent } from "@/components/CurrentComponentProvider";
import { Style } from "@ui-primitives-hub/types";

import { CssToTailwindTranslator } from "css-to-tailwind-translator";
import { useCurrentPartParam } from "@/features/sidebar/hooks/useCurrentPartParam.tsx";
import { useCurrentComponentStateParam } from "@/features/sidebar/hooks/useCurrentComponentStateParam.tsx";
import { useCallback, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";
import {
  getRawTailwindClasses,
  styleToString,
} from "@ui-primitives-hub/utils/src";

export const useComponentStyleMutation = () => {
  const { component, currentStyle, setCurrentStyle } = useCurrentComponent();
  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();
  const { mutate } = useUpdateAccordionStyle();

  const lastValidStyles = useRef(currentStyle);
  const componentRef = useRef(component); // Přidejte ref pro komponentu

  useEffect(() => {
    componentRef.current = component;
    lastValidStyles.current = currentStyle;
  }, [component, currentStyle]);

  const debouncedMutate = useDebounce(
    async (params: {
      part: string;
      state: string;
      value: string;
      previousStyles: Style;
    }) => {
      try {
        await mutate({
          name: params.part,
          attribute: params.state,
          value: params.value,
        });
      } catch (error) {
        console.error("Failed to save styles:", error);
        setCurrentStyle(params.previousStyles);
        lastValidStyles.current = params.previousStyles;
      }
    },
    500
  );

  const handleStyleChange = useCallback(
    async (key: keyof Style, value: any) => {
      try {
        if (!componentRef.current) return;

        const newStyle = { ...lastValidStyles.current, [key]: value } as Style;

        // Okamžitá aktualizace
        setCurrentStyle(newStyle);
        lastValidStyles.current = newStyle;

        const css = styleToString(newStyle);
        const conversionResult = CssToTailwindTranslator(`component { ${css} }`);
        const css_result = conversionResult.data[0].resultVal;

        // Aktualizujte komponentu přes ref
        componentRef.current.parts[currentPart!].attributes[currentState] = css_result;
        Object.keys(componentRef.current.parts).forEach((key) => {
          componentRef.current.parts[key].raw = getRawTailwindClasses(
            componentRef.current.parts[key].attributes
          );
        });

        // Předání aktuálních hodnot přímo do debounce
        debouncedMutate({
          part: currentPart!,
          state: currentState,
          value: css_result,
          previousStyles: lastValidStyles.current
        });

        return { success: true };
      } catch (error) {
        console.error("Style update failed:", error);
        return { success: false, error };
      }
    },
    [currentPart, currentState, debouncedMutate, setCurrentStyle]
  );

  return { handleStyleChange };
};