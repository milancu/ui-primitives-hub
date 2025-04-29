import { FieldService } from "../src/services/field.service";
import fs from "fs";
import path from "path";
import { vi, expect, describe, it } from "vitest";
import { getRawTailwindClasses } from "@ui-primitives-hub/common";

// Mock fs a getRawTailwindClasses
vi.mock("fs");
vi.mock("@ui-primitives-hub/common", () => ({
  getRawTailwindClasses: vi.fn(),
}));

describe("FieldService", () => {
  describe("getHierarchy", () => {
    it("should return the correct hierarchy", () => {
      const expectedHierarchy = {
        name: "root",
        isCustomizable: true,
        children: [
          { name: "label", isCustomizable: true },
          { name: "control", isCustomizable: true },
          { name: "description", isCustomizable: true },
          { name: "error", isCustomizable: true },
          { name: "validity", isCustomizable: true },
        ],
      };
      expect(FieldService.getHierarchy()).toEqual(expectedHierarchy);
    });
  });

  describe("getCode", () => {
    it("should return the code with replaced class names", () => {
      const components = {
        root: "root-class",
        label: "label-class",
        control: "control-class",
        description: "description-class",
        error: "error-class",
      };

      getRawTailwindClasses.mockImplementation((className: string) => className); // Mock implementation

      const mockTemplate = `class __ROOT_CLASSNAME__ __LABEL_CLASSNAME__ __CONTROL_CLASSNAME__ __DESCRIPTION_CLASSNAME__ __ERROR_CLASSNAME__`;
      const modulePath = path.resolve("node_modules", "@ui-primitives-hub/ui/src/components", "Field.tsx");
      fs.readFileSync.mockReturnValue(mockTemplate); // Mock reading the file

      const result = FieldService.getCode(components);

      expect(result).toContain("root-class");
      expect(result).toContain("label-class");
      expect(result).toContain("control-class");
      expect(result).toContain("description-class");
      expect(result).toContain("error-class");
      expect(fs.readFileSync).toHaveBeenCalledWith(modulePath, "utf-8");
    });
  });
});
