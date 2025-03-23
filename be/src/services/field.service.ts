import {ComponentHierarchy} from "@ui-primitives-hub/types";

export class FieldService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "label",
        },
        {
          name: "control",
        },
        {
          name: "description",
        },
        {
          name: "error",
        },
        {
          name: "validity",
        },
      ],
    }
  }
}