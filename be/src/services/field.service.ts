import {ComponentHierarchy} from "@ui-primitives-hub/types";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import path from "path";
import fs from "fs";

export class FieldService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      isCustomizable: true,
      children: [
        {
          name: "label",
          isCustomizable: true,
        },
        {
          name: "control",
          isCustomizable: true,
        },
        {
          name: "description",
          isCustomizable: true,
        },
        {
          name: "error",
          isCustomizable: true,
        },
        {
          name: "validity",
          isCustomizable: true,
        },
      ],
    }
  }

  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {root, label, control, description, error} = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Field.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__ROOT_CLASSNAME__/g, root || "")
      .replace(/__LABEL_CLASSNAME__/g, label || "")
      .replace(/__CONTROL_CLASSNAME__/g, control || "")
      .replace(/__DESCRIPTION_CLASSNAME__/g, description || "")
      .replace(/__ERROR_CLASSNAME__/g, error || "")

    return template
  }
}