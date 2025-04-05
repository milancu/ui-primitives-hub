import {ComponentHierarchy} from "@ui-primitives-hub/types";
import path from "path";
import fs from "fs";
import {getRawTailwindClasses} from "@ui-primitives-hub/common";

export class InputService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "input",
      isCustomizable: true,
    }
  }

  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {input} = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Input.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__INPUT_CLASSNAME__/g, input || "")

    return template
  }
}