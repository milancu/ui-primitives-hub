import { NumberfieldService } from "../src/services/numberfield.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("NumberfieldService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: true,
        children: [
          {
            name: "scrub-area",
            isCustomizable: true,
            children: [
              { name: "scrub-area-cursor", isCustomizable: false },
            ],
          },
          {
            name: "group",
            isCustomizable: true,
            children: [
              { name: "decrement", isCustomizable: true },
              { name: "input", isCustomizable: true },
              { name: "increment", isCustomizable: true },
            ],
          },
        ],
      };
      expect(NumberfieldService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        root: "root-class",
        scrubarea: "scrubarea-class",
        scrubareacursor: "scrubareacursor-class",
        group: "group-class",
        decrement: "decrement-class",
        input: "input-class",
        increment: "increment-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __ROOT_CLASSNAME__ __SCRUBAREA_CLASSNAME__ __SCRUBAREA_CURSOR_CLASSNAME__ __GROUP_CLASSNAME__ __DECREMENT_CLASSNAME__ __INPUT_CLASSNAME__ __INCREMENT_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "NumberField.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = NumberfieldService.getCode(components);

      expect(result).toContain("root-class");
      expect(result).toContain("scrubarea-class");
      expect(result).toContain("scrubareacursor-class");
      expect(result).toContain("group-class");
      expect(result).toContain("decrement-class");
      expect(result).toContain("input-class");
      expect(result).toContain("increment-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
