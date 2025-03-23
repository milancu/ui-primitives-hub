import {ComponentHierarchy} from "@ui-primitives-hub/types";

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
}