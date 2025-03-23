import {ComponentHierarchy} from "@ui-primitives-hub/types";

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
}