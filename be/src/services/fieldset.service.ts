import {ComponentHierarchy} from "@ui-primitives-hub/types";

export class FieldsetService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "legend",
        },
      ],
    }
  }
}