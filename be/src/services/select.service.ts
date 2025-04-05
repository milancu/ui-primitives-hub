import {ComponentHierarchy} from "@ui-primitives-hub/types";
import path from "path";
import fs from "fs";
import {getRawTailwindClasses} from "@ui-primitives-hub/common";

export class SelectService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      isCustomizable: false,
      children: [
        {
          name: "trigger",
          isCustomizable: true,
          children: [
            {name: "value", isCustomizable: false},
            {name: "icon", isCustomizable: false},
          ],
        },
        {
          name: "portal",
          isCustomizable: false,
          children: [
            {name: "backdrop", isCustomizable: false},
            {
              name: "positioner",
              isCustomizable: true,
              children: [
                {name: "scrollUpArrow", isCustomizable: true},
                {
                  name: "popup",
                  isCustomizable: true,
                  children: [
                    {name: "arrow", isCustomizable: false},
                    {
                      name: "item",
                      isCustomizable: true,
                      children: [{name: "itemText", isCustomizable: true}, {name: "itemIndicator", isCustomizable: false}]
                    },
                    {name: "separator", isCustomizable: false},
                    {name: "group", isCustomizable: true, children: [{name: "groupLabel", isCustomizable: true}]},
                  ],
                },
                {name: "scrollDownArrow", isCustomizable: true},
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
      icon,
      positioner,
      scrollUpArrow,
      popup,
      item,
      itemIndicator,
      itemText,
      scrollDownArrow
    } = componentsRawClasses;

    const modulePath = path.resolve(
      "node_modules",
      "@ui-primitives-hub/ui/src/components",
      "Collapsible.tsx"
    );

    let template = fs.readFileSync(modulePath, "utf-8");

    template = template
      .replace(/__TRIGGER_CLASSNAME__/g, trigger || "")
      .replace(/__ICON_CLASSNAME__/g, icon || "")
      .replace(/__POSITIONER_CLASSNAME__/g, positioner || "")
      .replace(/__SCROLL_UP_ARROW_CLASSNAME__/g, scrollUpArrow || "")
      .replace(/__POPUP_CLASSNAME__/g, popup || "")
      .replace(/__ITEM_CLASSNAME__/g, item || "")
      .replace(/__ITEM_INDICATOR_CLASSNAME__/g, itemIndicator || "")
      .replace(/__ITEM_TEXT_CLASSNAME__/g, itemText || "")
      .replace(/__SCROLL_DOWN_ARROW_CLASSNAME__/g, scrollDownArrow || "")

    return template
  }
}