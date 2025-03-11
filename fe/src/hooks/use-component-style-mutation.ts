import { useUpdateAccordionStyle } from "@/features/accordion/hooks/mutations/useUpdateAccordionStyle";

import { useCurrentComponent } from "@/components/CurrentComponentProvider";
import { Style } from "@ui-primitives-hub/types";
import { convertStringToStyle, styleToString } from "@ui-primitives-hub/utils/src";
import { CssToTailwindTranslator } from "css-to-tailwind-translator";
import { useCurrentComponentFilter } from "@/features/sidebar/hooks/useCurrentComponentFilter.tsx";
import { useCurrentComponentStateFilter } from "@/features/sidebar/hooks/useCurrentComponentStateFilter.tsx";

export const useComponentStyleMutation = () => {
  const { style, setStyle } = useCurrentComponent();
  const [component] = useCurrentComponentFilter();
  const [state] = useCurrentComponentStateFilter();
  const { mutate } = useUpdateAccordionStyle();

  const handleStyleChange = async (key: keyof Style, value: any) => {
    try {
      // Aktualizace stylu
      const newStyle = { ...style, [key]: value } as Style
      setStyle(newStyle)

      console.log(newStyle);

      // Konverze na CSS
      const css = styleToString(newStyle);

      // Překlad na Tailwind třídy
      const conversionResult = CssToTailwindTranslator(`
        component {
          ${css}
        }
      `);


      // Aktualizace stavu
      mutate({
        name: component,
        attribute: state,
        value: conversionResult.data[0].resultVal,
      });

      return { success: true };
    } catch (error) {
      console.error('Style update failed:', error);
      return { success: false, error };
    }
  };

  return {
    handleStyleChange
  };
};