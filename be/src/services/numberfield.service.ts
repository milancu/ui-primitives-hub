import {ComponentHierarchy} from "@ui-primitives-hub/types";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";
import path from "path";
import fs from "fs";

export class NumberfieldService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "scrub-area",
          children: [
            {
              name: "scrub-area-cursor",
            },
          ]
        },
        {
          name: "group",
          children: [
            {
              name: "decrement"
            },
            {name: "input"},
            {name: "increment"}
          ]
        }
      ],
    }
  }

  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {
      root,
      scrubarea,
      scrubareacursor,
      group,
      decrement,
      input,
      increment,
    } = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "NumberField.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__ROOT_CLASSNAME__/g, root || "")
      .replace(/__SCRUBAREA_CLASSNAME__/g, scrubarea || "")
      .replace(/__SCRUBAREA_CURSOR_CLASSNAME__/g, scrubareacursor || "")
      .replace(/__GROUP_CLASSNAME__/g, group || "")
      .replace(/__DECREMENT_CLASSNAME__/g, decrement || "")
      .replace(/__INPUT_CLASSNAME__/g, input || "")
      .replace(/__INCREMENT_CLASSNAME__/g, increment || "")

    return template
  }
}