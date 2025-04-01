import {ComponentHierarchy} from "@ui-primitives-hub/types";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import path from "path";
import fs from "fs";

export class FieldsetService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "legend",
        },
      ],
    }
  }

  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {root, legend} = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Fieldset.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__ROOT_CLASSNAME__/g, root || "")
      .replace(/__LEGEND_CLASSNAME__/g, legend || "")

    return template
  }
}