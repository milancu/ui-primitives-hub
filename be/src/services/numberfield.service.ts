import {ComponentHierarchy} from "@ui-primitives-hub/types";

export class NumberfieldService {
  static getHierarchy(): ComponentHierarchy {
    return {
      name: "root",
      children: [
        {
          name: "scrub-area",
          children: [
            {
              name: "scrub-area-cursor",
            },
          ]
        },
        {
          name: "group",
          children: [
            {
              name: "decrement"
            },
            {name: "input"},
            {name: "increment"}
          ]
        }
      ],
    }
  }
}