import {ComponentHierarchy} from "@ui-primitives-hub/types";
import path from "path";
import fs from "fs";
import {getRawTailwindClasses} from "@ui-primitives-hub/common";

export class PopoverService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      isCustomizable: false,
      children: [
        {
          name: "trigger",
          isCustomizable: true,
        },
        {
          name: "portal",
          isCustomizable: false,
          children: [
            {name: "backdrop", isCustomizable: false},
            {
              name: "positioner",
              isCustomizable: false,
              children: [
                {
                  name: "popup",
                  isCustomizable: true,
                  children: [
                    {name: "arrow", isCustomizable: false},
                    {name: "title", isCustomizable: true},
                    {name: "description", isCustomizable: true},
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }


  static getCode(components: Record<string, string>): string {
    const componentsRawClasses = Object.keys(components).reduce((acc: Record<string, string>, key) => {
      acc[key] = getRawTailwindClasses(components[key])
      return acc;
    }, {})

    const {
      trigger,
      positioner,
      group,
      arrow,
      title,
      description,
    } = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Collapsible.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__TRIGGER_CLASSNAME__/g, trigger || "")
      .replace(/__POSITIONER_CLASSNAME__/g, positioner || "")
      .replace(/__GROUP_CLASSNAME__/g, group || "")
      .replace(/__ARROW_CLASSNAME__/g, arrow || "")
      .replace(/__TITLE_CLASSNAME__/g, title || "")
      .replace(/__DESCRIPTION_CLASSNAME__/g, description || "")

    return template
  }
}