import {ComponentHierarchy} from "@ui-primitives-hub/types";
import {getRawTailwindClasses} from "@ui-primitives-hub/utils";
import path from "path";
import fs from "fs";

export class DialogService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "trigger",
        },
        {
          name: "portal",
          children: [
            {
              name: "backdrop",
            },
            {
              name: "popup",
              children: [
                {
                  name: "title",
                },
                {
                  name: "description",
                },
                {
                  name: "close",
                },
              ],
            },
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

    const {trigger, backdrop, popup, title, description, close} = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Dialog.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__TRIGGER_CLASSNAME__/g, trigger || "")
      .replace(/__BACKDROP_CLASSNAME__/g, backdrop || "")
      .replace(/__POPUP_CLASSNAME__/g, popup || "")
      .replace(/__TITLE_CLASSNAME__/g, title || "")
      .replace(/__DESCRIPTION_CLASSNAME__/g, description || "")
      .replace(/__CLOSE_CLASSNAME__/g, close || "")

    return template
  }
}