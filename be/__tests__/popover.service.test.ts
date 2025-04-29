import { PopoverService } from "../src/services/popover.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("PopoverService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
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
              { name: "backdrop", isCustomizable: false },
              {
                name: "positioner",
                isCustomizable: false,
                children: [
                  {
                    name: "popup",
                    isCustomizable: true,
                    children: [
                      { name: "arrow", isCustomizable: false },
                      { name: "title", isCustomizable: true },
                      { name: "description", isCustomizable: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
      expect(PopoverService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        trigger: "trigger-class",
        positioner: "positioner-class",
        group: "group-class",
        arrow: "arrow-class",
        title: "title-class",
        description: "description-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __TRIGGER_CLASSNAME__ __POSITIONER_CLASSNAME__ __GROUP_CLASSNAME__ __ARROW_CLASSNAME__ __TITLE_CLASSNAME__ __DESCRIPTION_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Collapsible.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = PopoverService.getCode(components);

      expect(result).toContain("trigger-class");
      expect(result).toContain("positioner-class");
      expect(result).toContain("group-class");
      expect(result).toContain("arrow-class");
      expect(result).toContain("title-class");
      expect(result).toContain("description-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
