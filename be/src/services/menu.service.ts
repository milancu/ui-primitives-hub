import {ComponentHierarchy} from "@ui-primitives-hub/types";
import {getRawTailwindClasses} from "@ui-primitives-hub/common";
import path from "path";
import fs from "fs";

export class MenuService {
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
            {
              name: "backdrop",
              isCustomizable: false,
            },
            {
              name: "positioner",
              isCustomizable: false,
              children: [
                {
                  name: "popup",
                  isCustomizable: true,
                  children: [
                    {
                      name: "arrow",
                      isCustomizable: false,
                    },
                    {
                      name: "item",
                      isCustomizable: true,
                    },
                    {
                      name: "separator",
                      isCustomizable: true,
                    },
                    {
                      name: "group",
                      isCustomizable: false,
                      children: [
                        {
                          name: "group-label",
                          isCustomizable: false,
                        },
                      ]
                    },
                    {
                      name: "radio-group",
                      isCustomizable: false,
                      children: [
                        {
                          name: "radio-item",
                          isCustomizable: false,
                        },
                      ]
                    },
                    {
                      name: "checkbox-item",
                      isCustomizable: false,
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