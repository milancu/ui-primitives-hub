import {ComponentHierarchy} from "@ui-primitives-hub/types";
import {getRawTailwindClasses} from "@ui-primitives-hub/utils";
import path from "path";
import fs from "fs";

export class AccordionService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "item",
          children: [
            {name: "header", children: [{name: "trigger"}]},
            {name: "panel"},
          ],
        },
      ],
    }
  }

  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {root, item, header, trigger, panel} = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Accordion.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__ROOT_CLASSNAME__/g, root || "")
      .replace(/__ITEM_CLASSNAME__/g, item || "")
      .replace(/__HEADER_CLASSNAME__/g, header || "")
      .replace(/__TRIGGER_CLASSNAME__/g, trigger || "")
      .replace(/__PANEL_CLASSNAME__/g, panel || "");

    return template
  }
}