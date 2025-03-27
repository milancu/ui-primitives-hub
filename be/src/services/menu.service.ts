import {ComponentHierarchy} from "@ui-primitives-hub/types";
import {getRawTailwindClasses} from "@ui-primitives-hub/utils";
import path from "path";
import fs from "fs";

export class MenuService {
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
              name: "positioner",
              children: [
                {
                  name: "popup",
                  children: [
                    {
                      name: "arrow",
                    },
                    {
                      name: "item",
                    },
                    {
                      name: "separator",
                    },
                    {
                      name: "group",
                      children: [
                        {
                          name: "group-label",
                        },
                      ]
                    },
                    {
                      name: "radio-group",
                      children: [
                        {
                          name: "radio-item",
                        },
                      ]
                    },
                    {
                      name: "checkbox-item",
                    },
                  ],
                },
              ],
            }
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

    const {
      trigger,
      backdrop,
      positioner,
      popup,
      arrow,
      item,
      separator,
      group,
      grouplabel,
      radiogroup,
      radioitem,
      checkboxitem
    } = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Menu.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__TRIGGER_CLASSNAME__/g, trigger || "")
      .replace(/__BACKDROP_CLASSNAME__/g, backdrop || "")
      .replace(/__POSITIONER_CLASSNAME__/g, positioner || "")
      .replace(/__POPUP_CLASSNAME__/g, popup || "")
      .replace(/__ARROW_CLASSNAME__/g, arrow || "")
      .replace(/__ITEM_CLASSNAME__/g, item || "")
      .replace(/__SEPARATOR_CLASSNAME__/g, separator || "")
      .replace(/__GROUP_CLASSNAME__/g, group || "")
      .replace(/__GROUP_LABEL_CLASSNAME__/g, grouplabel || "")
      .replace(/__RADIO_GROUP_CLASSNAME__/g, radiogroup || "")
      .replace(/__RADIO_ITEM_CLASSNAME__/g, radioitem || "")
      .replace(/__CHECKBOX_ITEM_CLASSNAME__/g, checkboxitem || "")

    return template
  }
}