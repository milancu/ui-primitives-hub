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
  const { component, currentStyle, setCurrentStyle, mutation } =
    useCurrentComponent();
  const [currentPart] = useCurrentPartParam();
  const [currentState] = useCurrentComponentStateParam();

  const lastValidStyles = useRef(currentStyle);
  const componentRef = useRef(component);

  // Debugging
  useEffect(() => {
    console.log("Component updated:", componentRef.current);
  }, [component]);

  useEffect(() => {
    componentRef.current = component;
    lastValidStyles.current = currentStyle;
  }, [component, currentStyle]);

  const debouncedMutate = useDebounce(
    async (params: { part: string; state: string; value: string }) => {
      if (!mutation) return;
      const { mutateAsync } = mutation;
      try {
        console.log("Calling mutate with:", params);
        await mutateAsync({
          name: params.part,
          attribute: params.state,
          value: params.value,
        }).then((res) => console.log(res));
        console.log("Mutate successful");
      } catch (error) {
        console.error("Mutate failed:", error);
      }
    },
    5000,
  );

  const handleStyleChange = useCallback(
    async (key: keyof Style, value: string) => {
      try {
        console.log("Handling style change:", key, value);

        if (!componentRef.current || !currentPart || !currentState) {
          console.error("Missing component, part or state");
          return;
        }

        const newStyle = { ...lastValidStyles.current, [key]: value } as Style;
        setCurrentStyle(newStyle);
        lastValidStyles.current = newStyle;

        const css = styleToString(newStyle);
        console.log("Generated CSS:", css);

        const conversionResult = CssToTailwindTranslator(
          `component { ${css} }`,
        );
        if (!conversionResult.data?.[0]?.resultVal) {
          throw new Error("Invalid CSS conversion");
        }
        const css_result = conversionResult.data[0].resultVal;
        console.log("Tailwind result:", css_result);

        componentRef.current.parts[currentPart].attributes[currentState] =
          css_result;
        // Object.keys(componentRef.current.parts).forEach((key) => {
        //   componentRef.current.parts[key].raw = getRawTailwindClasses(
        //     componentRef.current.parts[key].attributes,
        //   );
        // });


        componentRef.current.parts[currentPart].raw = getRawTailwindClasses(
          componentRef.current.parts[currentPart].attributes,
        );

        debouncedMutate({
          part: currentPart,
          state: currentState,
          value: css_result,
        });

        // const { mutateAsync } = mutation!;
        // mutateAsync({
        //   name: currentPart,
        //   attribute: currentState,
        //   value: css_result,
        // }).then((res) => {
        //   console.log(res);
        // });

        return { success: true };
      } catch (error) {
        console.error("Error in handleStyleChange:", error);
        return { success: false, error };
      }
    },
    [currentPart, currentState, debouncedMutate, setCurrentStyle],
  );

  return { handleStyleChange };
};
