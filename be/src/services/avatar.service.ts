import {ComponentHierarchy} from "@ui-primitives-hub/types";

export class AvatarService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "image",
        },
        {
          name: "fallback",
        },
      ],
    }
  }
}